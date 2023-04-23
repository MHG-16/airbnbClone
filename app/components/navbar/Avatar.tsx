import Image from "next/image";
import React from "react";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return src ? (
    <Image 
        className="rounded-full"
        height={30}
        width={30}
        alt="Avatar"
        src={src} />
  ) : (
    <RxAvatar
      className="bg-neutral-500 rounded-full text-neutral-100"
      size={30}
    />
  );
};

export default Avatar;
