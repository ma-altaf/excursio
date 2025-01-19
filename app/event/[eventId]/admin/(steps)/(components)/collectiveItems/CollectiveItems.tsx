import {
  CollectiveItemsMapType,
  CollectiveItemsType,
} from "@/features/events/services/firestore";
import { Dispatch, SetStateAction } from "react";
import NewCollectiveItem from "./NewCollectiveItem";
import ColItem from "./ColItem";

export default function CollectiveItems({
  collectiveItemsState,
}: {
  collectiveItemsState: [
    CollectiveItemsMapType,
    Dispatch<SetStateAction<CollectiveItemsMapType>>
  ];
}) {
  const [collectiveItemsList, setCollectiveItems] = collectiveItemsState;

  function colItemSubmit(colItemData: CollectiveItemsType) {
    const { title, amount, unit } = colItemData;
    const error = [];

    if (!title) {
      error.push("Title is required.");
    }

    if (collectiveItemsList?.has(title)) {
      error.push("Required item already exists.");
    }

    if (!unit) {
      error.push(`Unit of item is required.`);
    }

    if (!amount || amount <= 0) {
      error.push(`Amount of ${title || "item"} cannot be 0.`);
    }

    if (error.length != 0) {
      return error.join(" | ");
    }

    setCollectiveItems(
      (prev) => new Map(prev?.set(colItemData.title, colItemData))
    );

    return "";
  }

  function removeItem(title: string) {
    setCollectiveItems((prev) => {
      prev?.delete(title);
      return new Map(prev);
    });
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-center mb-2">
        Add items to contribute collectively
      </h2>
      <NewCollectiveItem onSubmit={colItemSubmit} />
      <div className="flex flex-col overflow-auto p-2 rounded-md border-2 border-black mt-2">
        {collectiveItemsList?.size == 0 ? (
          <p className="text-center">No collective items to contribute.</p>
        ) : (
          <p>Collective contribution items:</p>
        )}

        {collectiveItemsList
          ?.entries()
          .toArray()
          .map(([, colItemData], i) => (
            <ColItem key={i} colItemData={colItemData} onRemove={removeItem} />
          ))}
      </div>
    </div>
  );
}
