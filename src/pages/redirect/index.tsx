import Head from "next/head";
import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

const REDIRECT_DURATION = 2500;

const RedirectPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { to } = query;
  const redirectUrl = to as string;

  React.useEffect(() => {
    if (!query) router.push("/");

    const timeout = setTimeout(() => (window.location.href = redirectUrl), REDIRECT_DURATION);
    return () => clearTimeout(timeout);
  }, [router, query, redirectUrl]);

  return (
    <div className="app">
      <Head>
        <title>Teeny.fun</title>
        <meta
          name="description"
          content="Make teeny tiny URLs with emojis 😂!"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <h2>Redirecting to {redirectUrl}</h2>
    </div>
  );
};

export default RedirectPage;
