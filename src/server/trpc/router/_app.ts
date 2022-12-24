import { router } from "../trpc";
import userRouter from "./user";
import urlRouter from "./url";

export const appRouter = router({
  user: userRouter,
  url: urlRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
