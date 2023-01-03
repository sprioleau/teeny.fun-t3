import emojiStringToArray from "./emojiStringToArray";
import isEmoji from "./isEmoji";
import type { TopEmoji, Url } from "../types";

const getTopEmojis = (urlData: Url[]): TopEmoji => {
  return urlData?.reduce((acc, { teenyCode, hits }) => {
    const teenyCodeCharacters = emojiStringToArray(teenyCode);

    teenyCodeCharacters.forEach((character) => {
      if (!isEmoji(character)) return;

      if (!acc[character]) {
        acc[character] = hits;
      } else {
        acc[character] += hits;
      }
    });

    return acc;
  }, {} as TopEmoji);
};

export default getTopEmojis;
