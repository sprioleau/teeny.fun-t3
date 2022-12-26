import emojiUnicode from "emoji-unicode";
import { ROOT_URL, topEmojis } from "@constants";
import { generateTeenyCode } from "@utils";
import { z } from "zod";

import { router, publicProcedure } from "../../trpc";

export default router({
  createUrlForUser: publicProcedure
    .input(z.object({ userId: z.string(), longUrl: z.string() }))
    .mutation(({ ctx, input }) => {
      const user = ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const teenyCode = generateTeenyCode(topEmojis, 5);

      const newUrl = ctx.prisma.url.create({
        data: {
          userId: input.userId,
          longUrl: input.longUrl,
          shortUrl: `${ROOT_URL}/${teenyCode}`,
          teenyCode,
          codePoints: emojiUnicode.raw(teenyCode),
        },
      });

      return newUrl;
    }),

  incrementHits: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    const url = ctx.prisma.url.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!url) {
      throw new Error("Url not found");
    }

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
