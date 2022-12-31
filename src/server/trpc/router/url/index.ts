import emojiUnicode from "emoji-unicode";
import { ROOT_URL, topEmojis } from "@constants";
import { generateTeenyCode } from "@utils";
import { z } from "zod";

import { router, publicProcedure } from "../../trpc";

export default router({
  createUrlForUser: publicProcedure
    .input(z.object({ longUrl: z.string() }))
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new Error("User not found");
      }

      const teenyCode = generateTeenyCode(topEmojis, 5);

      const newUrl = ctx.prisma.url.create({
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
