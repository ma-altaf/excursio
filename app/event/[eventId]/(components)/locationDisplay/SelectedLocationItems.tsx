import { IoGlobeOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";
import { LocationType } from "@/features/events/services/firestore";

export default function SelectedLocationItems({
  location,
}: {
  location: LocationType;
}) {
  const { title, isOnline, link } = location;
  return (
    <div className="p-1 my-1 bg-gray-100 rounded-md">
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
    </div>
  );
}
