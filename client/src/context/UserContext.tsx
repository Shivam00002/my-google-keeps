"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [userName, setUserName] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        refetch,
        setRefetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const contextStates = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("contextStates must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, contextStates, UserContext };
