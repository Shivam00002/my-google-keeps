import { TNote } from "@/utils/type";
import React, { FC, useState } from "react";
import Icon from "../common/Icon";
import PrimaryButton from "../buttons/PrimaryButton";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTE } from "@/utils/graphql/queries";
import Pin from "../buttons/Pin";
import InputField from "../InputField/InputField";
import TextArea from "../InputField/TextArea";
import { contextStates } from "@/context/UserContext";
import Delete from "../buttons/Delete";

type TEditNote = {
  setModalOpen: (value: boolean) => void;
  noteData: TNote;
};

const EditNote: FC<TEditNote> = ({ noteData, setModalOpen }) => {
  const { setRefetch } = contextStates();

  const [data, setData] = useState<TNote>({
    title: noteData?.title || "",
    tagLine: noteData?.tagLine || "",
    body: noteData?.body || "",
    pin: noteData?.pin,
    _id: noteData?._id,
  });

  const [updateNote, { loading }] = useMutation(UPDATE_NOTE);

  // Setting inputs in a state
  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      title: e.target.value,
    });
  };

  const handleTagLineInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      tagLine: e.target.value,
    });
  };

  const handleBodyInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      body: e.target.value,
    });
  };

  const handleUpdateCTA = async () => {
    try {
      await updateNote({
        variables: {
          id: noteData._id,
          title: data?.title,
          tagLine: data?.tagLine,
          body: data?.body,
          pin: data?.pin,
        },
      }).then(() => {
        setRefetch(true);
        setModalOpen(false);
      });
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  return (
    <div className=" rounded-lg lg:w-[560px]">
      <div className="justify-between -mt-6 mb-4 hidden lg:flex md:flex">
        <Delete noteId={data._id as string} />
        <Pin
          isPinned={data?.pin}
          noteId={data._id as string}
          setModalOpen={setModalOpen}
        />
      </div>

      <div className="flex gap-x-2 items-center">
        <div className=" bg-white px-4 lg:px-6 lg:py-3 py-2 rounded-md border-2 border-primary flex items-center gap-4 w-full">
          <Icon src={"icons/pen.svg"} />

          <div className="w-full">
            <InputField
              handleInputChange={handleTitleInputChange}
              value={data?.title}
            />
          </div>
        </div>
      </div>

      <div>
        {/* tag line */}
        <div className="w-full bg-white px-4 py-2 rounded-md  my-3">
          <InputField
            handleInputChange={handleTagLineInputChange}
            value={data?.tagLine}
            placeholder={"Your Note Tag Line"}
          />
        </div>

        {/* text description */}
        <div className="p-4 bg-white rounded-md">
          <TextArea handleInputs={handleBodyInputChange} value={data?.body} />
        </div>

        <div className=" flex justify-between mt-6 items-center">
          <div className="gap-x-3 lg:hidden md:hidden flex">
            <Delete noteId={data._id as string} />
            <Pin
              isPinned={data?.pin}
              noteId={data._id as string}
              setModalOpen={setModalOpen}
            />
          </div>

          <div onClick={handleUpdateCTA}>
            <PrimaryButton label="Update" isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
