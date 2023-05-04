import React from "react";
import "./button.scss";
import { ButtonSizeTypes } from "../../interfaces/ButtonSizeTypes";
import { ButtonStyleTypes } from "../../interfaces/ButtonStyleTypes";
import LinkItem, { LinkOBJ } from "../link-item/link-item";
import { ColorTypes } from "../../interfaces/ColorTypes";
import RippleEffect from "../ripple-effect/ripple-effect";
/* 
export interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  ripple?: boolean;
  disabled?: boolean;
  elevation?: boolean;
  color?: ColorTypes;
  size?: ButtonSizeTypes;
  href?: LinkOBJ;
}
 */
export interface ButtonProps {
  id: string;
  child: React.ReactNode;
  onClick: () => void;
  size?: ButtonSizeTypes;
  ripple?: boolean;
  color?: ColorTypes;
  disabled?: boolean;
  type?: ButtonStyleTypes;
  href?: LinkOBJ;
  elevation?: boolean;
}
export default function Button({
  id,
  child,
  onClick,
  color = ColorTypes.PRIMARY,
  size = ButtonSizeTypes.MEDIUM,
  disabled = false,
  type = ButtonStyleTypes.STANDARD,
  href,
  ripple = true,
  elevation = true,
}: ButtonProps) {
  const button = (
    <button
      id={id}
      className={`button ${size} ${color} ${type} ${disabled && "disabled"} ${
        elevation && "elevated"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {ripple && <RippleEffect />}
      {child}
    </button>
  );
  return <>{href ? <LinkItem href={href}>{button}</LinkItem> : button}</>;
}
