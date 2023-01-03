import React from "react";

import { GrMagic } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { isSet, isValidUrl, removeTrailingSlash } from "@utils";
import { Button, ShortCodeStyleSelect } from "@components";
import { trpc } from "../utils/trpc";

export type ShortCodeStyleLabel = "Emojis" | "Standard";

export const ShortCodeStyleLabels = {
  Emojis: "Emojis",
  Standard: "Standard",
};

export type ShortCodeStyle = {
  id: string;
  label: ShortCodeStyleLabel;
};

const shortCodeStyles: ShortCodeStyle[] = [
  {
    id: "emojis",
    label: "Emojis",
  },
  {
    id: "standard",
    label: "Standard",
  },
];

export default function UrlForm() {
  const [longUrl, setLongUrl] = React.useState("");
  const [teenyCode, setTeenyCode] = React.useState("");
  const [selectedStyle, setSelectedStyle] = React.useState<ShortCodeStyleLabel>("Emojis");
  const utils = trpc.useContext();
  const router = useRouter();

  const { mutateAsync: createNewUrlMutation } = trpc.url.createUrlForUser.useMutation({
    onSuccess: ({ id }) => {
      utils.url.getAllByUserId.invalidate({ id });
      router.push("/");
    },
  });

  const handleShortCodeStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStyle(e.target.value as ShortCodeStyleLabel);
  };

  const handleUpdateLongUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const handleUpdateTeenyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeenyCode(e.target.value);
  };

  const handleCreateTeenyLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSet(longUrl)) return alert("Required fields not set");
    if (!isValidUrl(longUrl)) return alert("Not a valid URL");

    const newUrl = await createNewUrlMutation({
      longUrl: String(removeTrailingSlash(longUrl)),
      teenyCode: Boolean(teenyCode) ? String(teenyCode) : undefined,
      style: selectedStyle,
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
      className="url-form bg-squircle"
      onSubmit={handleCreateTeenyLink}
    >
      <label htmlFor="long-url">
        <div className="url-form__label-wrapper">
          <span className="url-form__label-icon">
            <HiLink />
          </span>
          <span className="url-form__label">Long URL</span>
        </div>
        <div className="url-form__input-wrapper">
          <input
            className="url-form__input"
            type="text"
            id="long-url"
            placeholder="https://www.a-very-long-url.com"
            value={longUrl}
            onChange={handleUpdateLongUrl}
            required
          />
        </div>
      </label>
      <label htmlFor="teeny-code">
        <div className="url-form__label-wrapper">
          <span className="url-form__label-icon">
            <GrMagic />
          </span>
          <span className="url-form__label">Customize?</span>
        </div>
        <div className="url-form__input-wrapper">
          <input
            className="url-form__input"
            type="text"
            id="teeny-code"
            value={teenyCode}
            onChange={handleUpdateTeenyCode}
          />
        </div>
      </label>
      <ShortCodeStyleSelect
        styles={shortCodeStyles}
        selectedStyle={selectedStyle}
        onChange={handleShortCodeStyleChange}
      />
      <Button
        type="submit"
        color="yellow"
        className="url-form__button"
      >
        teenify
      </Button>
    </form>
  );
}
