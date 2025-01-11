import { LocationType } from "@/features/events/services/firestore";
import Link from "next/link";
import { IoAdd, IoCheckmark, IoGlobeOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";

export default function SuggestionItem({
  locationData,
  onAdd,
  isSelected,
}: {
  locationData: LocationType;
  onAdd: (location: LocationType) => void;
  isSelected: boolean;
}) {
  const { title, isOnline, link } = locationData;

  return (
    <div className="bg-background p-1 rounded-md my-1 flex flex-row justify-between">
      <span>
        <p className="font-bold">{title}</p>
        {link &&
          (isOnline ? (
            <span className="flex flex-row items-center">
              <IoGlobeOutline className="size-5 mr-1" />
              <Link href={link} target="_blank">
                Open link
              </Link>
            </span>
          ) : (
            <span className="flex flex-row items-center">
              <MdOutlineLocationOn className="size-5 mr-1" />
              <Link href={link} target="_blank">
                Open map
              </Link>
            </span>
          ))}
      </span>

      <span className="flex flex-row">
        <hr className="h-full border-l-2 mx-1" />
        {isSelected ? (
          <div className="min-h-full flex justify-center items-center p-1 rounded-md">
            <IoCheckmark className="size-5" />
          </div>
        ) : (
          <button
            className="min-h-full flex justify-center items-center p-1 hover:bg-gray-200 rounded-md"
            title={`Remove location: ${title}`}
            onClick={() => onAdd(locationData)}
          >
            <IoAdd className="size-5" />
          </button>
        )}
      </span>
    </div>
  );
}
