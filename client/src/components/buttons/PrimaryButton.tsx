import Image from "next/image";
import React, { FC } from "react";
import GIF from "../../../public/loading.gif";

type TPrimaryButtonProps = {
  label: string;
  isLoading?: boolean;
};

const PrimaryButton: FC<TPrimaryButtonProps> = ({
  label,
  isLoading = false,
}) => {
  return (
    <div
      className={`bg-primary text-center rounded-lg py-1 px-8 text-white text-lg font-semibold cursor-pointer hover:bg-opacity-90 shadow-md ${
        isLoading && "bg-white py-0"
      }`}
    >
      {isLoading ? (
        <Image
          height={28}
          width={28}
          alt="loading"
          src={GIF}
          className=" mx-auto"
        />
      ) : (
        label
      )}
    </div>
  );
};

export default PrimaryButton;
