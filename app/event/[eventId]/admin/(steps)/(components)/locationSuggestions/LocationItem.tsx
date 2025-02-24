import { LocationType } from "@/features/events/services/firestore";
import Link from "next/link";
import { IoClose, IoGlobeOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";

export default function LocationItem({
  locationData,
  onRemove,
}: {
  locationData: LocationType;
  onRemove: (title: string) => void;
}) {
  const { title, isOnline, link } = locationData;

  return (
    <div className="bg-gray-100 p-1 rounded-md flex flex-row justify-between">
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
        <button
          className="min-h-full flex justify-center items-center p-1 hover:bg-gray-200 rounded-md"
          title={`Remove location: ${title}`}
          onClick={() => onRemove(title)}
        >
          <IoClose className="size-5" />
        </button>
      </span>
    </div>
  );
}
