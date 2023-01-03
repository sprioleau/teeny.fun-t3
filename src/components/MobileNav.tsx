import React from "react";
import AuthActionButton from "./AuthActionButton";
import Button from "./Button";

type Props = {
  isExpanded: boolean;
  onToggleMenu: (e: React.MouseEvent) => void;
};

export default function MobileNav({ isExpanded, onToggleMenu }: Props) {
  console.log("MobileNav isExpanded:", isExpanded);
  return (
    <nav className={["mobile-nav", isExpanded ? "expanded" : ""].join(" ")}>
      <ul className="mobile-nav__list">
        <li className="mobile-nav__list-item">
          <AuthActionButton />
        </li>
      </ul>
      <Button
        color="blue"
        onClick={onToggleMenu}
        className="mobile-nav__menu-button"
      />
      <div
        className="mobile-nav__overlay"
        onClick={onToggleMenu}
      ></div>
    </nav>
  );
}
