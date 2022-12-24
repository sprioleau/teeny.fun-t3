import { z } from "zod";

import { router, publicProcedure } from "../../trpc";

export default router({
  getUserById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    const user = ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
      include: {
        urls: true,
      },
    });

    return user;
  }),
  createNewUser: publicProcedure
    .input(z.object({ email: z.string(), displayName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newUser = await ctx.prisma.user.create({
        data: input,
      });

      return newUser;
    }),
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: {
        urls: true,
      },
    });
  }),
});
