import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import React from "react";
import Button from "./Button";

export default function AuthActionButton() {
  const { data: sessionData } = useSession();

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
      <Button
        color="yellow"
        onClick={handleAuthAction}
        icon={<AiOutlineUser />}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
      {Boolean(sessionData?.user?.image) && (
        <Image
          src={sessionData?.user?.image as string}
          width={40}
          height={40}
          style={{ borderRadius: "50%", border: "2px solid black" }}
          alt="user image"
        />
      )}
    </div>
  );
}
