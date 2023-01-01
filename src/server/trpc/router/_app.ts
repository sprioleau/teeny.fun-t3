import authRouter from "./auth";
import userRouter from "./user";
import urlRouter from "./url";
import { router } from "../trpc";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  url: urlRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
