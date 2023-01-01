import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
    <div
      style={{
        display: "flex",
        gap: "1em",
        alignSelf: "flex-end",
      }}
    >
      {Boolean(sessionData?.user?.image) && (
        <Image
          src={sessionData?.user?.image as string}
          width={40}
          height={40}
          style={{ borderRadius: "50%", border: "2px solid black" }}
          alt="user image"
        />
      )}
      <button onClick={handleAuthAction}>{sessionData ? "Sign out" : "Sign in"}</button>
    </div>
  );
}
