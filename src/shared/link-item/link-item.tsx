import React from "react";
import "./link-item.scss";
import { Link } from "react-router-dom";
import { LinkTypes } from "../../interfaces/LinkTypes";
export interface LinkOBJ {
  to: string;
  type: LinkTypes;
  workLikeRegularText?: boolean;
}
export interface LinkProps {
  href: LinkOBJ;
  children?: React.ReactNode;
}

export default function LinkItem({ href, children }: LinkProps) {
  switch (href.type) {
    case LinkTypes.INTERNAL:
      return (
        <Link
          className={`${href.workLikeRegularText && "remove-excess"}`}
          to={href.to}
        >
          {children}
        </Link>
      );
    case LinkTypes.EXTERNAL:
      return (
        <a
          className={`${href.workLikeRegularText && "remove-excess"}`}
          href={href.to}
        >
          {children}
        </a>
      );
    default:
      return <>{children}</>;
  }
}
