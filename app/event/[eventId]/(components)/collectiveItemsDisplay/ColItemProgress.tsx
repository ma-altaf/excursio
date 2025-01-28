"use state";

import React, { useState } from "react";
import ProgressBar from "@/shared/components/ProgressBar";
import { roboto } from "@/app/layout";
import {
  CollectiveItemsType,
  MemberType,
  updateColItem,
} from "@/features/events/services/firestore";
import Spinner from "@/shared/components/loading/Spinner";
import { BiDonateHeart } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

export default function ColItemProgress({
  colItemData,
  eventId,
  member,
}: {
  colItemData: CollectiveItemsType;
  eventId: string;
  member: MemberType;
}) {
  const { title, amount, unit, current } = colItemData;
  const [isContributing, setIsContributing] = useState(false);
  const [contributed, setContributed] = useState(
    (member.colItem && member.colItem[title]) || 0
  );
  const [contribution, setContribution] = useState(0);
  const [loading, setLoading] = useState(false);

  function contribute(newContribution: number) {
    setLoading(true);

    if (newContribution === contributed) {
      setIsContributing(false);
      setLoading(false);
      return;
    }

    updateColItem(eventId, member.uid, title, newContribution)
      .then((res) => {
        setContributed(res);
        setIsContributing(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col py-1 px-2 rounded-md bg-gray-100">
      <p>{title}</p>
      <span className="w-full flex flex-row items-center">
        <span className="w-full flex flex-col items-end mt-1">
          <ProgressBar
            current={current}
            userAmount={contributed}
            total={amount}
          />
          <pre className={`${roboto.className} antialiased text-sm`}>
            {current}/{amount} {unit}
          </pre>
        </span>
        {amount - current > 0 && (
          <button
            className="bg-white ml-1 p-1 hover:bg-gray-200 rounded-md"
            onClick={() => setIsContributing((prev) => !prev)}
          >
            {isContributing ? (
              <IoClose className="size-5" />
            ) : (
              <BiDonateHeart className="size-5" />
            )}
          </button>
        )}
      </span>

      {loading ? (
        <span className="w-full flex items-center justify-center p-1">
          <Spinner text="Loading..." />
        </span>
      ) : (
        isContributing && (
          <span className="w-full flex flex-row items-center p-1 justify-between">
            <label htmlFor={`amount-${title}`}>Amount:</label>
            <input
              defaultValue={contributed}
              min={0}
              max={amount - current + contributed}
              className="w-full p-1 mx-1 rounded-md border-2 border-black"
              type="number"
              id={`amount-${title}`}
              onChange={(e) => setContribution(e.target.valueAsNumber)}
            />
            <button
              onClick={() => {
                contribute(contribution);
              }}
              className="p-button rounded-md bg-accent"
            >
              Submit
            </button>
          </span>
        )
      )}
      {contributed > 0 && (
        <button
          className="bg-green-300 px-2 py-1 w-fit rounded-md my-1 flex flex-row items-center"
          onClick={() => {
            setIsContributing((prev) => !prev);
          }}
          title="Update the amount you are contributing"
        >
          <BiDonateHeart className="size-5 mr-1" />
          <p>
            You are contributing: <b>{contributed}</b> {unit}
          </p>
        </button>
      )}
    </div>
  );
}
