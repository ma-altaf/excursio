import { PiCrownSimpleFill } from "react-icons/pi";
import Image from "next/image";
import { MemberInListType } from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import { getImgURL } from "@/features/users/services/storage";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import { myFont } from "@/shared/services/utils";

export default function MembersBtn({
  members,
}: {
  members: MemberInListType[];
}) {
  const minifiedSize = 3;
  const [membersImgURL, setMembersImgURL] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    function membersImgPopulation() {
      if (members.length <= 0) return;

      async function populateMembers(count: number) {
        const imgUrlReq = [];

        for (let i = 0; i < Math.min(count, members.length); i++) {
          const member = members[i];
          imgUrlReq.push(getImgURL(member.uid));
        }

        setMembersImgURL(await Promise.all(imgUrlReq));
      }

      if (isOpen) {
        populateMembers(members.length);
      } else {
        populateMembers(minifiedSize);
      }
    },
    [isOpen, members, membersImgURL.length]
  );

  return isOpen ? (
    <div className="mt-1 w-full h-fit flex flex-row-reverse p-1 border-2 border-black rounded-md">
      <button
        onClick={() => setIsOpen(false)}
        className="sticky ml-1 top-1 p-3 w-fit h-fit aspect-square bg-gray-100 rounded-md flex flex-row items-center"
      >
        <IoClose className="size-4" />
      </button>

      <ul className="w-full flex flex-col">
        {members.map(({ displayName, uid }, i) => (
          <li key={uid}>
            <Link href={`/user/${uid}`} className="flex flex-row items-center">
              <Image
                priority
                src={membersImgURL[i] || "/images/user_pp.webp"}
                alt={`${displayName} profile picture`}
                width={40}
                height={40}
                className="rounded-full aspect-square object-cover"
              />
              <p className="ml-2">{displayName}</p>
            </Link>
            {i < members.length - 1 && (
              <hr className="my-1 w-full border-b-1" />
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <ul className="mt-1 grid grid-flow-col gap-1 w-fit">
      {members.length &&
        membersImgURL
          .filter((_, i) => i < minifiedSize)
          .map((imgURL, i) => (
            <li
              key={i}
              className={`${myFont.className} antialiased overflow-hidden`}
              style={{ zIndex: members.length - i }}
            >
              <div className="relative w-fit h-fit">
                {i == 0 && (
                  <PiCrownSimpleFill className="absolute bottom-0 left-1/2 -translate-x-1/2" />
                )}

                <Image
                  priority
                  src={imgURL || "/images/user_pp.webp"}
                  alt={`${members[i].displayName} profile picture`}
                  width={40}
                  height={40}
                  className="rounded-full aspect-square object-cover"
                />
              </div>
            </li>
          ))}
      {members.length > minifiedSize && (
        <p className="rounded-full bg-gray-100 py-2 px-3">
          +{members.length - minifiedSize}
        </p>
      )}
      <button
        className="rounded-full bg-gray-100 p-button flex flex-row items-center"
        onClick={() => setIsOpen(true)}
      >
        <p>expand</p>
        <MdExpandMore className="size-4 ml-1" />
      </button>
    </ul>
  );
}
