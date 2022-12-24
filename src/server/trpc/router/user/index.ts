import { z } from "zod";

import { router, publicProcedure } from "../../trpc";

export default router({
	userById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
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
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany({
			include: {
				urls: true,
			},
		});
	}),
});
