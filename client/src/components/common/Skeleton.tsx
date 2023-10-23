import React, { FC } from "react";

type TSkeleton = { size: string };

const Skeleton: FC<TSkeleton> = ({ size = "h-4 w-10" }) => {
  return (
    <div className={`animate-pulse rounded-md bg-slate-300 ${size}`}></div>
  );
};

export default Skeleton;
