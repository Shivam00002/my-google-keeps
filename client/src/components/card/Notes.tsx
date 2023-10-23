"use client";
import React, { FC, useState, useRef } from "react";
import Note from "./Note";
import ModalWrapper from "../modal/ModalWrapper";
import { TNote } from "@/utils/type";
import EditNote from "./EditNote";

type TNotes = {
  data: TNote[];
};

const Notes: FC<TNotes> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const prevCountRef = useRef(0);

  const handleModal = (index: number) => {
    prevCountRef.current = index;
    setModalOpen(true);
  };

  return (
    <div className="flex gap-2 flex-wrap max-w-screen-xl mx-auto justify-center ">
      {modalOpen && (
        <ModalWrapper
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          optionalStyle="bg-[#f3f3f3] py-6 -mx-6 px-2"
        >
          <EditNote
            setModalOpen={setModalOpen}
            noteData={data?.[prevCountRef.current]}
          />
        </ModalWrapper>
      )}
      {data?.length === 0 && <div>There is no data</div>}
      {data?.map((item: TNote, index: number) => (
        <Note
          key={index}
          item={item}
          handleOnClick={() => handleModal(index)}
        />
      ))}
    </div>
  );
};

export default Notes;
