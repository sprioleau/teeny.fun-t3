import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import {
  UrlForm,
  UrlTable,
  // Shapes
} from "@components";

import { trpc } from "@utils";

const HomePage: NextPage = () => {
  const { data: users } = trpc.user.getAllUsers.useQuery();
  const { data: urls } = trpc.url.getAllUrls.useQuery();
  const { data: sessionData } = useSession();
  const { data: teenyUrls = [] } = trpc.url.getAllByUserId.useQuery(
    { id: sessionData?.user?.id },
    { enabled: sessionData?.user !== undefined },
  );

  console.log("urls:", urls);
  console.log("users:", users);

  return (
    <>
      <Head>
        <title>Teeny.fun</title>
      </Head>

      <main className="home page">
        <UrlForm />
        {Boolean(teenyUrls?.length) && <UrlTable urls={teenyUrls} />}
        {/* <Shapes /> */}
        {/* {topEmojis && (
              <table>
                <thead>
                  <tr>
                    <th>Emoji</th>
                    <th>Hits</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(topEmojis)
                    .sort(([emojiA, hitsA], [emojiB, hitsB]) => hitsB - hitsA)
                    .map(([emoji, hits]) => (
                      <tr key={emoji}>
                        <td>{emoji}</td>
                        <td>{hits}</td>
                      </tr>
                    ))
                    .slice(0, 10)}
                </tbody>
              </table>
            )} */}
      </main>
    </>
  );
};

export default HomePage;
