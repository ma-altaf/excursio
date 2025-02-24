import { VoteLocationType } from "@/features/events/services/firestore";
import Link from "next/link";
import { IoGlobeOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";

export default function VoteItems({
  item,
  active,
}: {
  item: VoteLocationType;
  active: boolean;
}) {
  const { title, isOnline, link } = item.location;
  return (
    <div
      className={`py-1 px-2 flex flex-col items-start transition-colors ${
        active ? "bg-accent" : "bg-gray-100"
      } rounded-md`}
    >
      <p>{title}</p>
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
