import React, { FC, useState } from "react";
import ModalWrapper from "../modal/ModalWrapper";
import PrimaryButton from "../buttons/PrimaryButton";

import { useRouter } from "next/navigation";
import { CREATE_USER, GET_USER } from "@/utils/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { contextStates } from "@/context/UserContext";
import { toast } from "react-hot-toast";
import InputField from "../InputField/InputField";

const GetIn: FC = () => {
  const { setUserName } = contextStates();

  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const [isNull, setIsNull] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [create, { loading }] = useMutation(CREATE_USER);
  const getUser = useQuery(GET_USER, {
    variables: {
      userName: username,
    },
    skip: username ? false : true,
  });

  const CreateNewUser = async () => {
    try {
      await create({
        variables: { userName: username },
      }).then(() => {
        setUserName(username);
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
    toast.success("Welcome 👋");
  };

  const handleAuth = async () => {
    const fetchedUsername = getUser?.data?.getUserByUserName?.userName;
    if (fetchedUsername) {
      if (fetchedUsername === username) {
        setUserName(username);
        toast.success("Welcome back👋");
      }
    } else {
      CreateNewUser();
    }
  };

  const handleUserName = (value: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(value.target.value);
  };

  const handleGetIn = () => {
    if (username) {
      handleAuth();
    } else {
      setIsNull(true);
    }
  };

  return (
    <>
      <ModalWrapper modalOpen={true} setModalOpen={setModalOpen}>
        <div className="w-[340px]">
          <div className="flex items-end text-primary text-3xl font-semibold gap-x-2">
            Login
            <div className="text-sm text-black underline ">
              or pick new user name!
            </div>
          </div>

          <div className="text-sm text-black mt-4 lg:mt-8 mb-2">Username</div>
          <div className="border rounded-md border-primary px-4 py-2">
            <InputField
              handleInputChange={handleUserName}
              value={username}
              placeholder="Enter Your Username"
            />
          </div>

          {isNull && (
            <div className="text-red-700 self-end text-sm">
              Please Enter Username
            </div>
          )}

          <div className="mt-8" onClick={handleGetIn}>
            <PrimaryButton
              label="Get In"
              isLoading={loading || getUser?.loading}
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default GetIn;
