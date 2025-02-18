"use client";

import { RequiredItemsType } from "@/features/events/services/firestore";
import { useEffect, useState } from "react";

const emptyReqItem: RequiredItemsType = {
  title: "",
};

export default function NewRequiredItem({
  onSubmit,
}: {
  onSubmit: (reqItemData: RequiredItemsType) => string;
}) {
  const [reqItemData, setReqItemData] =
    useState<RequiredItemsType>(emptyReqItem);

  const [error, setError] = useState("");

  const { title } = reqItemData;

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [reqItemData]);

  function addReqItem(reqItemData: RequiredItemsType) {
    const res = onSubmit(reqItemData);

    if (res) {
      setError(res);
    } else {
      setReqItemData(emptyReqItem);
    }
  }

  return (
    <div className="flex flex-col border-2 border-black rounded-md p-2">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) =>
          setReqItemData((prev) => ({ ...prev, title: e.target.value }))
        }
        className="border-2 border-black rounded-md py-1 px-2 outline-accent"
        placeholder="Don't forget to bring..."
      />

      <button
        className="p-button w-full rounded-md bg-gray-200 mt-2 hover:bg-gray-300"
        onClick={() => addReqItem(reqItemData)}
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
