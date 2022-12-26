import React from "react";
import { isSet, isValidUrl, removeTrailingSlash } from "@utils";

import { GrMagic } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import { trpc } from "../utils/trpc";

const UrlForm = () => {
  const [longUrl, setLongUrl] = React.useState("");
  const [teenyCode, setTeenyCode] = React.useState("");

  const { mutateAsync: createNewUrlMutation } = trpc.url.createUrlForUser.useMutation();

  const handleUpdateLongUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLongUrl(e.target.value);
  const handleUpdateTeenyCode = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTeenyCode(e.target.value);

  const handleCreateTeenyLink = async () => {
    if (!isSet(longUrl)) return alert("Required fields not set");
    if (!isValidUrl(longUrl)) return alert("Not a valid URL");

    // const queryString = new URLSearchParams({
    //   long_url: String(removeTrailingSlash(longUrl)),
    // });

    const newUrl = await createNewUrlMutation({
      longUrl: String(removeTrailingSlash(longUrl)),
      userId: "clc3boaog0000g3enmlsupg4o", // test user
    });

    console.log("newUrl:", newUrl);

    // if (!error) setLongUrl("");

    if (Boolean(newUrl)) console.log("🎉 Success");

    setLongUrl("");
    setTeenyCode("");
  };

  return (
    <div className="form">
      <label htmlFor="long-url">
        <HiLink /> Paste in a long URL
        <input
          type="text"
          id="long-url"
          required
          value={longUrl}
          onChange={handleUpdateLongUrl}
        />
      </label>
      <label htmlFor="teeny-code">
        <GrMagic /> Customize your link?
        <input
          type="text"
          id="teeny-code"
          value={teenyCode}
          onChange={handleUpdateTeenyCode}
        />
      </label>
      <button
        type="submit"
        onClick={handleCreateTeenyLink}
      >
        teenify
      </button>
    </div>
  );
};

export default UrlForm;
