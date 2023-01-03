import { CgRadioChecked, CgRadioCheck } from "react-icons/cg";
import type { ShortCodeStyle } from "./UrlForm";

type Props = {
  styles: ShortCodeStyle[];
  selectedStyle: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ShortCodeStyleSelect({ styles, selectedStyle, onChange }: Props) {
  return (
    <div className="short-code-style-select">
      <span className="short-code-style-select__title">Style</span>
      <div className="short-code-style-select__radio-group">
        {styles.map(({ id, label }) => {
          const shouldShowCheck = label === selectedStyle;

          return (
            <div
              key={id}
              className="short-code-style-select__radio-wrapper"
            >
              <input
                className="short-code-style-select__input"
                type="radio"
                id={id}
                value={label}
                name="short-code-style"
                checked={shouldShowCheck}
                onChange={onChange}
              />
              <label
                className="short-code-style-select__label"
                htmlFor={id}
              >
                {shouldShowCheck ? <CgRadioChecked /> : <CgRadioCheck />}
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
