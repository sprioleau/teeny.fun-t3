import React from "react";
import AuthActionButton from "./AuthActionButton";
import Button from "./Button";

type Props = {
  isExpanded: boolean;
  onToggleMenu: (e: React.MouseEvent) => void;
};

export default function MobileNav({ isExpanded, onToggleMenu }: Props) {
  return (
    <nav className={["mobile-nav", isExpanded ? "expanded" : ""].join(" ")}>
      <div className="mobile-nav__menu-button-wrapper">
        <Button
          color="blue"
          onClick={onToggleMenu}
          className="mobile-nav__menu-button"
        />
      </div>
      <ul className="mobile-nav__list">
        <li className="mobile-nav__list-item">
          <AuthActionButton />
        </li>
      </ul>
      <div
        className="mobile-nav__overlay"
        onClick={onToggleMenu}
      ></div>
    </nav>
  );
}
