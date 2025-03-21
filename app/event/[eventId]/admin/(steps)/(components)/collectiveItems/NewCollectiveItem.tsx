"use client";

import { CollectiveItemsType } from "@/features/events/services/firestore";
import { useEffect, useState } from "react";

const emptyColItem: CollectiveItemsType = {
  title: "",
  amount: 1,
  unit: "",
  current: 0,
};

export default function NewCollectiveItem({
  onSubmit,
}: {
  onSubmit: (colItemData: CollectiveItemsType) => string;
}) {
  const [colItemData, setColItemData] =
    useState<CollectiveItemsType>(emptyColItem);

  const [error, setError] = useState("");

  const { title, amount, unit } = colItemData;

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [colItemData]);

  function addColItem(colItemData: CollectiveItemsType) {
    const res = onSubmit(colItemData);

    if (res) {
      setError(res);
    } else {
      setColItemData(emptyColItem);
    }
  }

  return (
    <div className="flex flex-col border-2 border-black rounded-md p-1">
      <label htmlFor="colItemtitle">Title:</label>
      <input
        type="text"
        id="colItemtitle"
        name="colItemtitle"
        value={title}
        onChange={(e) =>
          setColItemData((prev) => ({ ...prev, title: e.target.value }))
        }
        className="border-2 border-black rounded-md py-1 px-2 outline-accent"
        placeholder="Contribute so we can have..."
      />

      <span className="w-full flex flex-col sm:flex-row items-center pt-1">
        <span className="flex flex-col w-full">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={String(amount)}
            min={1}
            onChange={(e) => {
              setColItemData((prev) => ({
                ...prev,
                amount: Number(e.target.value),
              }));

              console.log(Number(e.target.value));
            }}
            className="border-2 border-black rounded-md py-1 px-2 outline-accent"
            placeholder="How many we need"
          />
        </span>
        <hr className="w-4 h-1" />
        <span className="flex flex-col w-full">
          <label htmlFor="unit">Unit:</label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={unit}
            onChange={(e) =>
              setColItemData((prev) => ({ ...prev, unit: e.target.value }))
            }
            className="border-2 border-black rounded-md py-1 px-2 outline-accent"
            placeholder="Ex: count, kg, $"
          />
        </span>
      </span>

      <button
        className="p-button w-full rounded-md bg-gray-200 mt-2 hover:bg-gray-300"
        onClick={() => addColItem(colItemData)}
      >
        Add
      </button>

      {error && (
        <p className="mt-2 py-1 px-2 bg-red-100 rounded-md border-2 border-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
