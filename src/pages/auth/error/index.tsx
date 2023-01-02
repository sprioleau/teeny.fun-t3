import { type NextPage } from "next";
import { useRouter } from "next/router";

const AuthErrorPage: NextPage = () => {
  const { query } = useRouter();
  const { error } = query as { error: string };

  return (
    <main className="error page">
      <h2>🤷🏾‍♂️ Oops! There was an error</h2>
      <pre>{error}</pre>
    </main>
  );
};

export default AuthErrorPage;
