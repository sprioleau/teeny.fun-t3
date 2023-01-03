import { type ShortCodeStyleLabel, ShortCodeStyleLabels } from "components/UrlForm";
import { topEmojis } from "@constants";
import { standardCharacters } from "@constants";
import pickRandomElement from "./pickRandomElement";

const generateTeenyCode = (style: ShortCodeStyleLabel, desiredLength = 4) => {
  let code = "";
  const characters = style === ShortCodeStyleLabels.Emojis ? topEmojis : [...standardCharacters];

  for (let i = 0; i < desiredLength; i++) {
    code += pickRandomElement(characters);
  }

  return code;
};

export default generateTeenyCode;
