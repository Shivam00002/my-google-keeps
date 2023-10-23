"use client";
import Home from "@/components/Home";
import GetIn from "@/components/auth/GetIn";
import { contextStates } from "@/context/UserContext";
import client from "@/utils/graphql/client";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Toaster } from "react-hot-toast";

const page = () => {
  const { userName } = contextStates();

  return (
    <>
      <Toaster />
      <ApolloProvider client={client}>
        <div>
          {userName ? (
            <div>
              <Home />
            </div>
          ) : (
            <div>
              <GetIn />
            </div>
          )}
        </div>
      </ApolloProvider>
    </>
  );
};

export default page;
