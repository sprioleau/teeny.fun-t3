import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import Nav from "./Nav";
import UserAvatar from "./UserAvatar";

export default function Header() {
  const router = useRouter();

  const handleRedirect = () => router.push("/");

  return (
    <header className="header">
      <div className="header__left">
        <Image
          className="header__emoji"
          src="/images/smiley.svg"
          alt="Smiley emoji"
          width={50}
          height={50}
          onClick={handleRedirect}
        />
        <Image
          className="header__logo"
          src={"/images/logo.svg"}
          alt="teeny.fun logo"
          width={100 * (142 / 75)}
          height={100}
          onClick={handleRedirect}
        />
        <Image
          className="header__logo-mobile"
          src={"/images/logo-mobile.svg"}
          alt="teeny.fun logo"
          width={48 * (300 / 83)}
          height={48}
          onClick={handleRedirect}
        />
      </div>
      <div className="header__right">
        <UserAvatar />
        <Nav />
      </div>
    </header>
  );
}
