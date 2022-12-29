import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "@styles/styles.scss";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider
      session={session}
      basePath="/auth"
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
