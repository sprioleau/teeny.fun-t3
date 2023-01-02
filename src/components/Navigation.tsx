import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import AuthActionButton from "./AuthActionButton";

export default function Navigation() {
  const router = useRouter();

  const logo = {
    height: 100,
    aspectRatio: 142 / 75,
  };

  const handleRedirect = () => router.push("/");

  return (
    <nav className="nav">
      <div className="nav__left">
        <Image
          className="nav__emoji"
          src="/images/smiley.svg"
          alt="Smiley emoji"
          width={50}
          height={50}
          onClick={handleRedirect}
        />
        <h2 className="nav__tagline">Teeny URLs with emojis</h2>
        <Image
          className="nav__logo"
          src={"/images/logo.svg"}
          alt="teeny.fun logo"
          width={logo.height * logo.aspectRatio}
          height={logo.height}
          onClick={handleRedirect}
        />
      </div>
      <AuthActionButton />
    </nav>
  );
}
