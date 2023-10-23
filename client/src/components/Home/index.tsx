import { contextStates } from "@/context/UserContext";
import React, { useEffect } from "react";
import NotAuthenticated from "../auth/NotAuthenticated";
import NoteTaker from "./NoteTaker";
import PinnedNotes from "./PinnedNotes";
import UnpinnedNotes from "./UnpinnedNotes";

const Home = () => {
  const { userName } = contextStates();

  return userName ? (
    <div>
      <NoteTaker />
      <PinnedNotes />
      <div className="border-t border-gray-300 pt-4">
        <UnpinnedNotes />
      </div>
    </div>
  ) : (
    <NotAuthenticated />
  );
};

export default Home;
