import React from "react";
import "./icon-button.scss";

import LinkItem, { LinkOBJ } from "../link-item/link-item";
import { ButtonSizeTypes } from "../../interfaces/ButtonSizeTypes";
import { ColorTypes } from "../../interfaces/ColorTypes";
import RippleEffect from "../ripple-effect/ripple-effect";

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

export default function IconButton({
  icon,
  onClick,
  ripple,
  disabled,
  color = ColorTypes.PRIMARY,
  size = ButtonSizeTypes.MEDIUM,
  href,
  elevation = true,
}: IconButtonProps) {
  let button = (
    <button
      className={`icon-button ${elevation && "elevated"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {ripple && <RippleEffect />}
      {icon}
    </button>
  );
  if (href) {
    button = <LinkItem href={href}>{button}</LinkItem>;
  }

  return button;
}
