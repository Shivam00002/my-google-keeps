import { toast } from "react-hot-toast";
import { DELETE_NOTE } from "@/utils/graphql/queries";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React, { FC } from "react";
import { contextStates } from "@/context/UserContext";

type Props = {
  noteId: string;
};

const Delete: FC<Props> = ({ noteId }) => {
  const { setRefetch } = contextStates();

  const [deleteNote, { data, loading }] = useMutation(DELETE_NOTE, {
    variables: { id: noteId }, // Pass the noteId variable to the mutation
    onError: (error) => {
      toast.error("Delete Note Error");
    },
    onCompleted: () => {
      toast.success("Your Note is deleted");
    },
  });

  const handleNoteDelete = () => {
    deleteNote();
    setRefetch(true);
  };

  return (
    <div
      className="p-1 rounded-full hover:bg-gray-300 w-fit cursor-pointer"
      onClick={handleNoteDelete}
    >
      <Image
        alt="icon"
        height={18}
        width={18}
        src={loading ? "/loading.gif" : "/icons/bin.png"}
      />
    </div>
  );
};

export default Delete;
