import Image from "next/image";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Link from "next/link";

const NotAuthenticated = () => {
  return (
    <div className="justify-center items-center flex flex-col">
      <Image
        height={100}
        width={100}
        className="h-64 w-64 mt-20"
        alt="Image"
        src={"/NotAuthenticated.png"}
      />

      <div className="text-black font-semibold text-center text-base">
        Sorry You have to login first
      </div>
      <Link className="mt-6" href={"/"}>
        <PrimaryButton label="Go To Home" />
      </Link>
    </div>
  );
};

export default NotAuthenticated;
