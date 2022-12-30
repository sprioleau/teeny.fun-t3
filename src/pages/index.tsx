import { type NextPage } from "next";
import Head from "next/head";
import { default as logo } from "../images/logo.svg";
import { UrlForm, Shapes } from "@components";

import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "@utils";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: users } = trpc.user.getAllUsers.useQuery();
  const { data: urls } = trpc.url.getAllUrls.useQuery();
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
              {/* <Image src={cry} alt="cry face emoji" width={100} height={100} /> */}
              {/* <Logo size="20rem" /> */}
            </span>
          </h1>
          <Shapes />

          {/* {!authedUser ? (
              <form onSubmit={handleSubmit}>
                <button type="submit">Login with GitHub</button>
              </form>
            ) : (
              <>
                <h2>Current user is {authedUser?.email}</h2>
                <form onSubmit={handleLogout}>
                  <button type="submit">Logout</button>
                </form>
              </>
            )} */}
          <UrlForm />
          {/* <NewUserForm /> */}
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
      <AuthShowcase />

      <footer>
        <p>
          Built by{" "}
          <a
            href="https://sprioleau.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            San&apos;Quan Prioleau
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
