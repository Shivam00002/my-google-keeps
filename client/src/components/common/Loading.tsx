import Image from "next/image";
import React, { FC } from "react";

const Loading: FC = () => {
  return (
    <div>
      <Image src={"/loading.gif"} height={32} width={32} alt="loading" />
    </div>
  );
};

export default Loading;
