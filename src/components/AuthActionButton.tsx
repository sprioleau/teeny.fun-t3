import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function AuthActionButton() {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = trpc.auth.getUrlsByUserId.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined },
  // );

  const handleAuthAction = () => {
    if (sessionData) signOut();
    else signIn();
  };

  return (
    <div style={{ alignSelf: "flex-end", marginRight: "2em", marginTop: "1em" }}>
      <button onClick={handleAuthAction}>{sessionData ? "Sign out" : "Sign in"}</button>
    </div>
  );
}
