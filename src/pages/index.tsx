import { type NextPage } from "next";
import Head from "next/head";
import { BsArrowUpRight } from "react-icons/bs";
import { useSession } from "next-auth/react";
import {
  AuthActionButton,
  Footer,
  Logo,
  UrlForm,
  // Shapes
} from "@components";

import { formatAsDomainName, trpc } from "@utils";

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

      <main className="main">
        <AuthActionButton />
        <div className="home-page">
          <h1>
            <span
              aria-hidden={true}
              hidden={true}
            >
              teeny.fun
            </span>
            <span
              style={{
                width: "20rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Logo size="15rem" />
            </span>
          </h1>
          {Boolean(teenyUrls?.length) && (
            <div>
              <h3>Top 5 URLs</h3>
              <table>
                <thead>
                  <tr>
                    <th>teeny.fun/</th>
                    <th>Long URL</th>
                    <th>Hits</th>
                  </tr>
                </thead>
                <tbody>
                  {[...teenyUrls]
                    .map(({ id, teenyCode, shortUrl, longUrl, hits }) => (
                      <tr key={id}>
                        <td>
                          <a
                            href={teenyCode}
                            title={shortUrl}
                          >
                            {teenyCode}
                            <BsArrowUpRight />
                          </a>
                        </td>
                        <td>
                          <a
                            href={longUrl}
                            title={longUrl}
                          >
                            {formatAsDomainName(longUrl)}
                          </a>
                        </td>
                        <td>{hits}</td>
                      </tr>
                    ))
                    .slice(0, 5)}
                </tbody>
              </table>
            </div>
          )}
          {/* <Shapes /> */}
          <UrlForm />
          {/* <p>
            <Link href="/">Sign up</Link> to update your links.
          </p>
          <p>
            <Link href="/">Already have an account?</Link>
          </p> */}
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
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
