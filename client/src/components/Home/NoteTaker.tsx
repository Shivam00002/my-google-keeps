"use client";
import React, { FC, useState } from "react";
import Icon from "../common/Icon";
import PrimaryButton from "../buttons/PrimaryButton";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE } from "@/utils/graphql/queries";
import { contextStates } from "@/context/UserContext";
import InputField from "../InputField/InputField";
import TextArea from "../InputField/TextArea";
import { toast } from "react-hot-toast";

const NoteTaker: FC = () => {
  const { userName, setRefetch } = contextStates();

  const [title, setTitle] = useState<string>("");
  const [tagLine, setTagLine] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [createNote, { loading }] = useMutation(CREATE_NOTE);

  //creating note in backend
  const handleCreateCTA = async () => {
    try {
      await createNote({
        variables: {
          userName: userName,
          title: title,
          tagLine: tagLine,
          body: body,
          pin: false,
        },
      }).then(() => {
        setRefetch(true);
        setIsTyping(false);
        toast.success("Your Note is created");
        setTitle("");
        setTagLine("");
        setBody("");
      });
    } catch (error) {
      toast.error("Error creating note");
      // throw error;
    }
  };

  //setting inputs in a state
  const handleTitleInputChange = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    value.preventDefault();
    setTitle(value.target.value);
  };
  const handleTagLineInputChange = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    value.preventDefault();
    setTagLine(value.target.value);
  };
  const handleBodyInputs = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    value.preventDefault();
    setBody(value.target.value);
  };

  //UI logic
  const onTyping = () => setIsTyping(true);
  const onTypingClose = () => {
    setIsTyping(false);
    setTitle("");
    setTagLine("");
    setBody("");
  };

  return (
    <div className="max-w-[700px] mx-auto mb-8 mt-16">
      <div className={`bg-gray-100 shadow-xl rounded-lg ${isTyping && "p-3"}`}>
        <div className="flex gap-x-2 items-center">
          <div
            onClick={onTyping}
            className=" bg-white px-4 lg:px-6 lg:py-3 py-2 rounded-md border-b-2 border-primary flex items-center gap-4 w-full"
          >
            <Icon src={"icons/pen.svg"} />

            <div className="w-full">
              <InputField
                handleInputChange={handleTitleInputChange}
                value={title}
                placeholder={
                  isTyping
                    ? "Your Note Title"
                    : "Start typing here to add note..."
                }
              />
            </div>
          </div>
        </div>

        {isTyping && (
          <div>
            {/* tag line */}
            <div className="w-full bg-white px-4 py-2 rounded-md  my-2 border-b-2 border-primary">
              <InputField
                handleInputChange={handleTagLineInputChange}
                value={tagLine}
                placeholder={"Your Note Tag Line"}
              />
            </div>

            {/* text description */}
            <div className="p-4 bg-white rounded-md">
              <TextArea handleInputs={handleBodyInputs} value={body} />
            </div>
          </div>
        )}
      </div>
      {isTyping && (
        <div className="mt-2 flex justify-between">
          <div
            onClick={onTypingClose}
            className="cursor-pointer bg-gray-200 hover:bg-secondry p-1 rounded-full self-start"
          >
            <Icon
              src="icons/close.svg"
              style="h-[24px] w-[24px] object-contain"
            />
          </div>

          <div onClick={handleCreateCTA}>
            <PrimaryButton label="Create" isLoading={loading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteTaker;
