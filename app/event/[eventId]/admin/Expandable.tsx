"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Expandable({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="w-full flex flex-col p-2 border-b-2 border-t-2">
      <button
        className="w-full p-2 flex justify-between items-center"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <h2 className="text-xl flex flex-row items-center justify-center">
          {title}
        </h2>
        <div className="p-button rounded-md flex flex-row items-center ml-4 bg-gray-100">
          {expanded ? (
            <>
              <p className="hidden sm:block mr-2">Collapse</p>
              <IoIosArrowUp className="size-5" />
            </>
          ) : (
            <>
              <p className="hidden sm:block mr-2">Expand</p>
              <IoIosArrowDown className="size-5" />
            </>
          )}
        </div>
      </button>
      {expanded && children}
    </section>
  );
}
