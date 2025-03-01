import { RequiredItemsType } from "@/features/events/services/firestore";
import { Dispatch, SetStateAction } from "react";
import NewRequiredItem from "./NewRequiredItem";
import ReqItem from "./ReqItem";

export default function RequiredItems({
  requiredItemsState,
}: {
  requiredItemsState: [
    RequiredItemsType[],
    Dispatch<SetStateAction<RequiredItemsType[]>>
  ];
}) {
  const [requiredItemsList, setRequiredItems] = requiredItemsState;

  function reqItemSubmit(reqItemData: RequiredItemsType) {
    const { title } = reqItemData;
    const error = [];

    if (!title) {
      error.push("Title is required.");
    }

    if (requiredItemsList.map((el) => el.title).includes(title)) {
      error.push("Required item already exists.");
    }

    if (error.length != 0) {
      return error.join(" | ");
    }

    setRequiredItems((prev) => [...prev, reqItemData]);

    return "";
  }

  function removeItem(title: string) {
    setRequiredItems((prev) => {
      return prev.filter((reqItem) => reqItem.title != title);
    });
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-center mb-2">Add required items</h2>
      <NewRequiredItem onSubmit={reqItemSubmit} />
      <div className="grid grid-flow-row gap-1 overflow-auto p-1 rounded-md border-2 border-black mt-2">
        {requiredItemsList.length == 0 ? (
          <p className="text-center">No required items to bring.</p>
        ) : (
          <p>Required item{requiredItemsList.length > 1 && "s"}:</p>
        )}

        {requiredItemsList.map((reqItemData, i) => (
          <ReqItem key={i} reqItemData={reqItemData} onRemove={removeItem} />
        ))}
      </div>
    </div>
  );
}
