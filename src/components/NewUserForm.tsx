import React from "react";

import error from "next/error";
import { isSet, trpc } from "@utils";

const UrlForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [displayName, setDisplayName] = React.useState<string>("");

  const { mutateAsync: createNewUserMutation } = trpc.user.createNewUser.useMutation();

  const handleUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleUpdateDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value);
  const handleCreateUser = async () => {
    if (!isSet([email, displayName])) return alert("Required fields not set");

    const newUser = await createNewUserMutation({
      email,
      displayName,
    });

    if (error) console.error("error:", error);
    console.log("newUser:", newUser);
  };

  return (
    <form className="form">
      <label htmlFor="email">
        Email
        <input type="email" id="email" value={email} onChange={handleUpdateEmail} />
      </label>
      <label htmlFor="display-name">
        Display Name
        <input type="text" id="display-name" value={displayName} onChange={handleUpdateDisplayName} />
      </label>
      <button type="submit" onClick={handleCreateUser}>
        Create New User
      </button>
    </form>
  );
};

export default UrlForm;
