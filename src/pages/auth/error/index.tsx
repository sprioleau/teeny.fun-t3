import { type NextPage } from "next";
import { useRouter } from "next/router";

const AuthErrorPage: NextPage = () => {
  const { query } = useRouter();
  const { error } = query as { error: string };

  return (
    <div>
      <h2>There was an error</h2>
      <pre>{error}</pre>
    </div>
  );
};

export default AuthErrorPage;
