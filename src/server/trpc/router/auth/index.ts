import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../../trpc";

export default router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getUrlsByUserId: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("Not logged in");
    }

    return ctx.prisma.url.findMany({
      where: {
        userId,
      },
    });
  }),
});
