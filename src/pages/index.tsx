import { type NextPage } from "next";
import Head from "next/head";
import { FiGithub } from "react-icons/fi";
import { default as logo } from "../images/logo.svg";
import {
  AuthActionButton,
  Button,
  UrlForm,
  // Shapes
} from "@components";

import { useSession } from "next-auth/react";

import { trpc } from "@utils";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: users } = trpc.user.getAllUsers.useQuery();
  const { data: urls } = trpc.url.getAllUrls.useQuery();
  const { data: sessionData } = useSession();
  const { data: teenyUrls = [] } = trpc.url.getAllByUserId.useQuery(
    { id: sessionData?.user?.id },
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  console.log("urls:", urls);
  console.log("users:", users);

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
              <Image
                src={logo}
                alt="Teeny.fun logo"
              />
              {/* <Logo size="20rem" /> */}
            </span>
          </h1>
          {Boolean(teenyUrls?.length) && (
            <div>
              <h3>Top 5 Urls</h3>
              <table>
                <thead>
                  <tr>
                    <th>teeny URL</th>
                    <th>Long URL</th>
                    <th>Hits</th>
                  </tr>
                </thead>
                <tbody>
                  {[...teenyUrls]
                    .sort((a, b) => b.hits - a.hits)
                    .map(({ id, shortUrl, longUrl, hits }) => (
                      <tr key={id}>
                        <td>
                          <a href={shortUrl}>{shortUrl}</a>
                        </td>
                        <td>
                          <a href={longUrl}>{longUrl}</a>
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

      <footer className="footer">
        <p>
          Created by{" "}
          <a
            href="https://sprioleau.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            San&apos;Quan Prioleau
          </a>
        </p>
        <Button
          label="Star on GitHub"
          icon={<FiGithub />}
          as="a"
          href="https://github.com/sprioleau/teeny.fun"
        />
      </footer>
    </div>
  );
};

export default Home;
