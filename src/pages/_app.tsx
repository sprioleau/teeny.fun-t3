import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "@components";
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
      <ToastContainer
        autoClose={3000}
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
