import { contextStates } from "@/context/UserContext";
import { GET_NOTES } from "@/utils/graphql/queries";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Skeleton from "../common/Skeleton";
import Notes from "../card/Notes";
import PrimaryButton from "../buttons/PrimaryButton";

const UnpinnedNotes = () => {
  const { userName, refetch, setRefetch } = contextStates();
  const [limit, setLimit] = useState(6);

  const {
    loading,
    data,
    refetch: doRefetch,
  } = useQuery(GET_NOTES, {
    variables: {
      userName: userName,
      pin: false,
      offset: limit - 6,
      limit: limit,
    },
    fetchPolicy: "network-only",
  });

  const handleMore = () => {
    setLimit((previous) => previous + 6);
  };
  const handlePrevious = () => {
    if (limit >= 12) setLimit((previous) => previous - 6);
  };

  useEffect(() => {
    doRefetch();
    setRefetch(false);
  }, [refetch]);

  return (
    <div className="max-w-[1200px] mx-auto mb-8">
      {loading ? (
        <div className="flex flex-wrap gap-x-6">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton size="h-64 w-[270px]" key={item} />
          ))}
        </div>
      ) : (
        <div className="mx-2">
          {data?.getNotesByUserName.length > 0 && (
            <>
              <div className="uppercase text-xs font-bold px-2 py-1 bg-primary rounded-lg w-fit text-white">
                Other
              </div>

              <Notes data={data?.getNotesByUserName} />
            </>
          )}
          <div className="flex justify-between">
            <div onClick={handlePrevious}>
              {limit > 6 && <PrimaryButton label="Previous" />}
            </div>

            <div onClick={handleMore}>
              {data?.getNotesByUserName?.length >= 6 && (
                <PrimaryButton label="More" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnpinnedNotes;
