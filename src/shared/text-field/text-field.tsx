import React from "react";
import "./text-field.scss";
import { TextFieldStyleTypes } from "../../interfaces/TextFieldStyleTypes";
export interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  styleType: TextFieldStyleTypes;
  placeholder?: string;
  onBlur?: () => void;
}
export default function TextField({
  id,
  label,
  value,
  onChange,
  error,
  disabled = false,
  type = "text",
  styleType = TextFieldStyleTypes.STANDARD,
  placeholder = "",
  onBlur,
}: TextFieldProps) {
  const [focused, setFocused] = React.useState<boolean>(false);

  const handleBlur = () => {
    setFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className="text-field">
      <div className="input-container">
        <div className={` ${focused || value ? "label__focused" : "label"}`}>
          <label htmlFor={id}>{label}</label>
        </div>
        <input
          id={id}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={() => setFocused(true)}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
        />
      </div>
      {error && <div className="text-field__error">{error}</div>}
    </div>
  );
}
