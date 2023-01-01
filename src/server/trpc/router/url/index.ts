import emojiUnicode from "emoji-unicode";
import { z } from "zod";
import { ROOT_URL, topEmojis } from "@constants";
import { generateTeenyCode } from "@utils";

import { router, publicProcedure, protectedProcedure } from "../../trpc";

export default router({
  createUrlForUser: protectedProcedure
    .input(z.object({ longUrl: z.string(), teenyCode: z.string().nullish() }))
    .mutation(async ({ ctx, input }) => {
      const userDesiredTeenyCode = input.teenyCode;
      const generatedTeenyCode = generateTeenyCode(topEmojis, 5);
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

  getHits: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    const teenyUrlData = ctx.prisma.url.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!teenyUrlData) {
      throw new Error("Url not found");
    }

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
      });
    }),

  incrementHits: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    const updatedUrl = ctx.prisma.url.update({
      where: {
        id: input.id,
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
