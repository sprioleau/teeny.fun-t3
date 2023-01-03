import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function UserAvatar() {
  const { data: sessionData } = useSession();
  console.log("sessionData:", sessionData);

  if (!Boolean(sessionData?.user)) return null;

  const name = sessionData?.user?.name ?? "user image";

  return (
    <div className="user-avatar">
      <Image
        className="user-avatar__image"
        src={sessionData?.user?.image as string}
        width={45}
        height={45}
        title={name}
        alt={name}
      />
    </div>
  );
}
