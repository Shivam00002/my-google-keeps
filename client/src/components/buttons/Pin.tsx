import { contextStates } from "@/context/UserContext";
import { UPDATE_NOTE_PIN } from "@/utils/graphql/queries";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

type Props = {
  isPinned: boolean;
  noteId: string;
  setModalOpen?: (value: boolean) => void;
};

const Pin: FC<Props> = ({ isPinned, noteId, setModalOpen }) => {
  const { setRefetch } = contextStates();

  const [updateNotePin, { loading, data }] = useMutation(UPDATE_NOTE_PIN, {
    update: (cache, { data }) => {
      // Manually update the cache after the mutation is performed
      const updatedNote = data?.updateNote; // Adjust this based on your GraphQL response structure
      cache.modify({
        fields: {
          // Modify the cache for the specific note ID
          getNotesByUserName(existingNotes = []) {
            const updatedNotes = existingNotes.map((note: any) => {
              if (note._id === updatedNote._id) {
                return updatedNote;
              }
              return note;
            });
            return updatedNotes;
          },
        },
      });
    },
  });

  // Function to handle pin toggle
  const handlePinToggle = async () => {
    try {
      await updateNotePin({
        variables: {
          id: noteId,
          pin: !isPinned,
        },
      }).then(() => {
        setRefetch(true);
        if (setModalOpen) {
          setModalOpen(false);
        }
        toast.success(`Your Note is ${!isPinned ? "Pinned" : "Un Pinned"}`);
      });
    } catch (error) {
      toast.error("something went wrong while updating note !");
    }
  };

  return (
    <div
      className="p-1 rounded-full hover:bg-gray-300 w-fit cursor-pointer"
      onClick={handlePinToggle}
    >
      <Image
        alt="icon"
        height={18}
        width={18}
        src={
          loading
            ? "/loading.gif"
            : isPinned
            ? "/icons/pinned.svg"
            : "/icons/unPin.svg"
        }
      />
    </div>
  );
};

export default Pin;
