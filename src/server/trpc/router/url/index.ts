// import { z } from "zod";

import { router, publicProcedure } from "../../trpc";

export default router({
	// getUrlById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
	// 	const user = ctx.prisma.user.findUnique({
	// 		where: {
	// 			id: input.id,
	// 		},
	// 	});

	// 	return user;
	// }),
	getAllUrls: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.url.findMany();
	}),
});
