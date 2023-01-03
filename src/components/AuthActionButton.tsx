import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import React from "react";
import Button from "./Button";

export default function AuthActionButton() {
  const { data: sessionData } = useSession();

  const handleAuthAction = () => {
    if (sessionData) signOut();
    else signIn();
  };

  return (
    <div className="auth-action-button">
      <Button
        color="yellow"
        onClick={handleAuthAction}
        icon={<AiOutlineUser />}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
}
