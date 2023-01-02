import Image from "next/image";
import React from "react";
import AuthActionButton from "./AuthActionButton";

export default function Navigation() {
  const logo = {
    height: 100,
    aspectRatio: 142 / 75,
  };

  return (
    <nav className="nav">
      <div className="nav__left">
        <Image
          className="nav__emoji"
          src="/images/smiley.svg"
          alt="Smiley emoji"
          width={50}
          height={50}
        />
        <h2 className="nav__tagline">Teeny URLs with emojis</h2>
        <Image
          className="nav__logo"
          src={"/images/logo.svg"}
          alt="teeny.fun logo"
          width={logo.height * logo.aspectRatio}
          height={logo.height}
        />
      </div>
      <AuthActionButton />
    </nav>
  );
}
