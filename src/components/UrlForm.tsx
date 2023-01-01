import React from "react";

import { GrMagic } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { isSet, isValidUrl, removeTrailingSlash } from "@utils";
import { Button } from "@components";
import { trpc } from "../utils/trpc";

const UrlForm = () => {
  const utils = trpc.useContext();
  const router = useRouter();

  const [longUrl, setLongUrl] = React.useState("");
  const [teenyCode, setTeenyCode] = React.useState("");

  const { mutateAsync: createNewUrlMutation } = trpc.url.createUrlForUser.useMutation({
    onSuccess: ({ id }) => {
      utils.url.getAllByUserId.invalidate({ id });
      router.push("/");
    },
  });

  const handleUpdateLongUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const handleUpdateTeenyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeenyCode(e.target.value);
  };

  const handleCreateTeenyLink = async () => {
    if (!isSet(longUrl)) return alert("Required fields not set");
    if (!isValidUrl(longUrl)) return alert("Not a valid URL");

    const newUrl = await createNewUrlMutation({
      longUrl: String(removeTrailingSlash(longUrl)),
      teenyCode: Boolean(teenyCode) ? String(teenyCode) : undefined,
    });

    console.log("newUrl:", newUrl);

    if (Boolean(newUrl)) {
      toast(`🎉 teeny.fun/${newUrl?.teenyCode} created! \n\n🌐: ${newUrl?.longUrl}`);
    }

    setLongUrl("");
    setTeenyCode("");
  };

  return (
    <form
      className="form"
      onSubmit={handleCreateTeenyLink}
    >
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
        color="yellow"
        className="form__button"
      >
        teenify
      </Button>
    </form>
  );
};

export default UrlForm;
