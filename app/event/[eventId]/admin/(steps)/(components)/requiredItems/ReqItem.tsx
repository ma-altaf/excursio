import { RequiredItemsType } from "@/features/events/services/firestore";
import { IoClose } from "react-icons/io5";

export default function ReqItem({
  reqItemData,
  onRemove,
}: {
  reqItemData: RequiredItemsType;
  onRemove: (title: string) => void;
}) {
  const { title } = reqItemData;
  return (
    <div className="bg-gray-100 p-1 rounded-md flex flex-row justify-between">
      <span>
        <p>{title}</p>
      </span>

      <span className="flex flex-row">
        <hr className="h-full border-l-2 mx-1" />
        <button
          className="min-h-full flex justify-center items-center p-1 hover:bg-gray-200 rounded-md"
          title={`Remove required item: ${title}`}
          onClick={() => onRemove(title)}
        >
          <IoClose className="size-5" />
        </button>
      </span>
    </div>
  );
}
