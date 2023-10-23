import React, { FC } from "react";
import Image from "next/image";
import { TNote } from "@/utils/type";
import Pin from "../buttons/Pin";
import Delete from "../buttons/Delete";

type TNoteProps = {
  item: TNote;
  handleOnClick: () => void;
};

const Note: FC<TNoteProps> = ({ item, handleOnClick }) => {
  return (
    <div className="group/item ">
      <div className="flex justify-between -mb-4 -mr-2 cursor-pointer rounded-full group/edit visible lg:invisible group-hover/item:visible w-full">
        <Delete noteId={item?._id as string} />
        <Pin isPinned={item?.pin} noteId={item?._id as string} />
      </div>
      <div
        onClick={handleOnClick}
        className="border border-primary rounded-lg w-fit mx-2 lg:mx-0 lg:max-w-[300px] p-2 lg:p-4 bg-white  cursor-pointer"
      >
        {/* title */}
        <div className="overflow-hidden text-primary font-bold">
          {item?.title.slice(0, 48)} {item?.title?.length > 48 && "..."}
        </div>

        {/* tag line */}
        <div className="overflow-hidden text-black text-sm border-t border-primary pt-2">
          {item?.tagLine.slice(0, 58)} {item?.tagLine?.length > 58 && "..."}
        </div>
        {/* desc */}
        <div className="text-sm text-slate-500 mt-1 border-t border-primary pt-2">
          {item?.body.slice(0, 200)} {item?.body?.length > 200 && "..."}
        </div>
      </div>
    </div>
  );
};

export default Note;
