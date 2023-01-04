import React from "react";

import { GrMagic } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { isSet, isValidUrl, removeTrailingSlash } from "@utils";
import { Button, CheckboxOption, ShortCodeStyleSelect, TeenifyAnimation } from "@components";
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
  const [showCustomizationOptions, setShowCustomizationOptions] = React.useState(false);
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

  const handleToggleCustomizationOptions = () => {
    setShowCustomizationOptions(!showCustomizationOptions);
  };

  return (
    <form
      className={["url-form", "bg-squircle", showCustomizationOptions ? "lg" : "md"]
        .join(" ")
        .trim()}
      onSubmit={handleCreateTeenyLink}
    >
      <header className="url-form__header">
        <h2 className="url-form__title">Teenify</h2>
        <p className="url-form__subtitle">Sign in to create your own</p>
      </header>
      <main className="url-form__main">
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
              type="url"
              id="long-url"
              placeholder="https://very-long-url.to"
              value={longUrl}
              onChange={handleUpdateLongUrl}
              required
            />
          </div>
        </label>
        <CheckboxOption
          id="customize"
          label="Customize?"
          checked={showCustomizationOptions}
          onChange={handleToggleCustomizationOptions}
          icon={<GrMagic />}
        />
        {showCustomizationOptions && (
          <fieldset className="url-form__fieldset">
            <ShortCodeStyleSelect
              styles={shortCodeStyles}
              selectedStyle={selectedStyle}
              onChange={handleShortCodeStyleChange}
            />
            {selectedStyle === "Emojis" && (
              <label htmlFor="teeny-code">
                <div className="url-form__label-wrapper">
                  <span className="url-form__label">Enter your emojis</span>
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
            )}
          </fieldset>
        )}
        <Button
          type="submit"
          color="yellow"
          className="url-form__button"
        >
          <TeenifyAnimation animationDurationSeconds={2} />
          teenify
        </Button>
      </main>
    </form>
  );
}
