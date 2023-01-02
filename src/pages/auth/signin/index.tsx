import { type NextPage } from "next";
import { type AppProviders } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { Button } from "@components";

type SignInPageProps = {
  providers: AppProviders;
};

const SignInPage: NextPage<SignInPageProps> = ({ providers }) => {
  return (
    <>
      <Head>
        <title>Sign-in | Teeny.fun</title>
      </Head>

      <main className="sign-in page">
        <h1 className="sign-in__title">Sign in</h1>
        <ul className="sign-in__providers">
          {Object.values(providers).map(({ name, id }) => (
            <li key={name}>
              <Button
                onClick={() => {
                  signIn(id, { callbackUrl: "/" });
                }}
                color="blue"
              >
                with {name}
              </Button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default SignInPage;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
