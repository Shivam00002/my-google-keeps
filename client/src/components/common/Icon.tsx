import Image from "next/image";
import React, { FC } from "react";

type TIcon = {
  src: string;
  style?: string;
};

const Icon: FC<TIcon> = ({ src, style = "object-contain" }) => {
  return (
    <Image width={18} height={18} alt="ICON" src={src} className={style} />
  );
};

export default Icon;
