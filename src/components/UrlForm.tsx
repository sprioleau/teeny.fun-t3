import React from "react";
import { isSet, isValidUrl, removeTrailingSlash } from "@utils";

import { GrMagic } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import Button from "./Button";

const UrlForm = () => {
  const utils = trpc.useContext();
  const [longUrl, setLongUrl] = React.useState("");
  const [teenyCode, setTeenyCode] = React.useState("");

  const { mutateAsync: createNewUrlMutation } = trpc.url.createUrlForUser.useMutation({
    onSuccess: ({ id }) => {
      utils.url.getAllByUserId.invalidate({ id });
    },
  });

  const handleUpdateLongUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLongUrl(e.target.value);
  const handleUpdateTeenyCode = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTeenyCode(e.target.value);

  const handleCreateTeenyLink = async () => {
    if (!isSet(longUrl)) return alert("Required fields not set");
    if (!isValidUrl(longUrl)) return alert("Not a valid URL");

    const newUrl = await createNewUrlMutation({
      longUrl: String(removeTrailingSlash(longUrl)),
    });

    console.log("newUrl:", newUrl);

    if (Boolean(newUrl)) console.log("🎉 Success");

    setLongUrl("");
    setTeenyCode("");
  };

  return (
    <div className="form">
      <label htmlFor="long-url">
        <div className="form__label-wrapper">
          <span className="form__label-icon">
            <HiLink />
          </span>
          <span className="form__label">Paste in a long URL</span>
        </div>
        <input
          className="form__input"
          type="text"
          id="long-url"
          placeholder="https://www.a-very-long-url.com"
          value={longUrl}
          onChange={handleUpdateLongUrl}
          required
        />
      </label>
      <label htmlFor="teeny-code">
        <div className="form__label-wrapper">
          <span className="form__label-icon">
            <GrMagic />
          </span>
          <span className="form__label">Customize your link?</span>
        </div>
        <input
          className="form__input"
          type="text"
          id="teeny-code"
          value={teenyCode}
          onChange={handleUpdateTeenyCode}
        />
      </label>
      <Button
        type="submit"
        onClick={handleCreateTeenyLink}
        label="teenify"
        color="yellow"
        className="form__button"
      />
    </div>
  );
};

export default UrlForm;
