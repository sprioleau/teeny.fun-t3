import Head from "next/head";
import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { trpc } from "@utils";

const REDIRECT_DURATION = 2500;

const RedirectPage: NextPage = () => {
  const router = useRouter();

  const { query } = router;
  const { to: redirectUrl, id } = query as { to: string; id: string };
  const { data: teenyUrlData } = trpc.url.getHits.useQuery({ id });
  const { mutate: incrementHitsMutation } = trpc.url.incrementHits.useMutation();

  React.useEffect(() => {
    if (!query) router.push("/");
    if (!window) return;

    incrementHitsMutation({ id });

    const redirectTimeout = setTimeout(async () => {
      window.location.href = redirectUrl;
    }, REDIRECT_DURATION);

    return () => clearTimeout(redirectTimeout);
  }, [router, query, id, redirectUrl, incrementHitsMutation]);

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
      {Boolean(teenyUrlData?.hits) && <p>Hits: {teenyUrlData?.hits}</p>}
    </div>
  );
};

export default RedirectPage;
