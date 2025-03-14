"use client";

import {
  CollectiveItemsMapType,
  CollectiveItemsType,
  getColItems,
  membersSnapShot,
  MemberType,
} from "@/features/events/services/firestore";
import ProgressBar from "@/shared/components/ProgressBar";
import { myFont } from "@/shared/services/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function ColItems({ eventId }: { eventId: string }) {
  const [colItems, setColItems] = useState<CollectiveItemsMapType>(new Map());
  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    const unsubMember = membersSnapShot(eventId, true, (res) => {
      setMembers(res);
    });

    getColItems(eventId).then((res) => setColItems(res));

    return () => {
      unsubMember.then(() => console.log("Unsub from members."));
    };
  }, [eventId]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <span className="m-4 w-full flex justify-center items-center">
        <Link
          href={`/event/${eventId}`}
          className="p-3 bg-gray-100 rounded-md flex flex-row items-center"
        >
          <FaArrowLeft className="size-4" />
        </Link>
        <h1 className="text-3xl w-full text-center">Moderate Contributions</h1>
      </span>

      <ul className="w-full">
        {colItems
          .entries()
          .toArray()
          .map(([title, data]) => (
            <li className="w-full" key={title}>
              <ColItemsItem
                item={data}
                members={members.filter((m) => m.colItem && m.colItem[title])}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}

function ColItemsItem({
  item,
  members,
}: {
  item: CollectiveItemsType;
  members: MemberType[];
}) {
  const { title, amount, unit } = item;

  const current = members.reduce((prev, m) => prev + m.colItem![title], 0);

  return (
    <div className="p-1 my-1 w-full rounded-md border-2 border-black flex flex-col">
      <span className="mb-1">
        <span className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          {current == amount && (
            <p className="py-1 px-2 bg-green-300 rounded-md">Complete!</p>
          )}
        </span>
        <span className="w-full flex flex-col items-end mt-1">
          <ProgressBar current={current} total={amount} />
          <pre className={`${myFont.className} antialiased text-sm`}>
            {current}/{amount} {unit}
          </pre>
        </span>
      </span>

      {members.length === 0 ? (
        <p className="p-1 bg-gray-100 text-center rounded-md">
          No Contribution
        </p>
      ) : (
        <ul>
          {members
            .sort((m1, m2) => m2.colItem![title] - m1.colItem![title])
            .map((m) => (
              <MemberContibution
                title={title}
                key={m.uid}
                member={m}
                amount={amount}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

function MemberContibution({
  title,
  member,
  amount,
}: {
  title: string;
  member: MemberType;
  amount: number;
}) {
  const { displayName, colItem } = member;

  return (
    <div className="my-1 px-1 rounded-md border-2 border-black flex flex-row items-center justify-between relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-accent -z-10"
        style={{ width: `${(colItem![title] / amount) * 100}%` }}
      ></div>
      <p>{displayName}</p>
      <p>{colItem![title]}</p>
    </div>
  );
}
