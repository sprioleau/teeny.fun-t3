import emojiUnicode from "emoji-unicode";
import { z } from "zod";
import { ROOT_URL } from "@constants";
import { generateTeenyCode } from "@utils";

import { type ShortCodeStyleLabel, ShortCodeStyleLabels } from "components/UrlForm";
import { router, publicProcedure, protectedProcedure } from "../../trpc";

export default router({
  createUrlForUser: protectedProcedure
    .input(
      z.object({
        longUrl: z.string(),
        teenyCode: z.string().nullish(),
        // style: z.number(),
        style: z.enum([ShortCodeStyleLabels.Emojis, ShortCodeStyleLabels.Standard]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userDesiredTeenyCode = input.teenyCode;
      const generatedTeenyCode = generateTeenyCode(input.style as ShortCodeStyleLabel, 5);
      const teenyCode = userDesiredTeenyCode ?? generatedTeenyCode;

      const existingUrl = await ctx.prisma.url.findUnique({
        where: {
          teenyCode,
        },
      });

      if (existingUrl) {
        throw new Error("Teeny code already exists");
      }

      const newUrl = await ctx.prisma.url.create({
        data: {
          userId: ctx.session.user.id,
          longUrl: input.longUrl,
          shortUrl: `${ROOT_URL}/${teenyCode}`,
          teenyCode,
          codePoints: emojiUnicode.raw(teenyCode),
        },
      });

      return newUrl;
    }),

  getHits: publicProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      if (!input.id) throw new Error("Url not found");

      const teenyUrlData = await ctx.prisma.url.findUnique({
        where: {
          id: input?.id ?? "",
        },
      });

      if (!teenyUrlData) throw new Error("Url not found");

      return teenyUrlData;
    }),

  getAllByUserId: protectedProcedure
    .input(z.object({ id: z.string().nullish() }))

    .query(({ ctx, input }) => {
      const userId = input.id;

      if (!userId) {
        throw new Error("Not logged in");
      }

      return ctx.prisma.url.findMany({
        where: {
          userId,
        },
        orderBy: {
          hits: "desc",
        },
        take: 5,
      });
    }),

  incrementHits: publicProcedure
    .input(z.object({ id: z.string().nullish() }))
    .mutation(({ ctx, input }) => {
      const updatedUrl = ctx.prisma.url.update({
        where: {
          id: input.id ?? "",
        },
        data: {
          hits: {
            increment: 1,
          },
        },
      });

      if (!updatedUrl) {
        throw new Error("Url not found");
      }

      return updatedUrl;
    }),

  getByTeenyCode: publicProcedure
    .input(z.object({ teenyCode: z.string() }))
    .query(({ ctx, input }) => {
      const url = ctx.prisma.url.findUnique({
        where: {
          teenyCode: input.teenyCode,
        },
      });

      return url;
    }),

  getAllUrls: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.url.findMany();
  }),
});
