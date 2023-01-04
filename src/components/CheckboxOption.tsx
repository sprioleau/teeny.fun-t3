type Props = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CheckboxOption({ id, label, icon, checked, onChange, ...rest }: Props) {
  return (
    <div className="checkbox-option">
      <input
        className="checkbox-option__input"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <label
        htmlFor={id}
        className="checkbox-option__label"
      >
        <div className="checkbox-option__label-wrapper">
          <span className="checkbox-option__label-icon">{icon}</span>
          <span className="checkbox-option__label-text">{label}</span>
        </div>
      </label>
    </div>
  );
}
