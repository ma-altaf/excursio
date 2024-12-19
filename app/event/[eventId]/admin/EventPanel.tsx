"use client";

import { EventStepsType } from "@/features/events/services/firestore";
import { useEventContext } from "./eventProvider";
import { useState } from "react";
import {
  MdOutlineDescription,
  MdOutlineContactMail,
  MdOutlineLocationOn,
} from "react-icons/md";
import { FaRegClock, FaRegListAlt } from "react-icons/fa";

export default function EventPanel() {
  const { activeSection, setActiveSection } = useEventContext();
  const [toggle, setToggle] = useState(false);

  function ToggleItem({
    value,
    active,
    children,
  }: {
    value: EventStepsType;
    active: EventStepsType;
    children: React.ReactNode;
  }) {
    return (
      <li>
        <button
          className={`flex flex-row items-center p-2 rounded-md w-full ${
            active == value && "bg-blue-100 text-blue-700 font-bold"
          }`}
          onClick={(element) => {
            element.stopPropagation();
            setActiveSection(value);
          }}
        >
          {children}
        </button>
      </li>
    );
  }

  return (
    <nav
      onClick={() => setToggle((prev) => !prev)}
      className="flex flex-col bg-white border-2 rounded-md m-1 px-2 relative"
    >
      <p className="p-2 uppercase font-bold text-xl text-gray-300 absolute rotate-90 top-0 right-1/2 translate-x-1/2 translate-y-1/2 pointer-events-none">
        {toggle ? "Close" : "Open"}
      </p>
      <ul className="my-auto">
        <ToggleItem value="description" active={activeSection}>
          {toggle ? (
            <p>Description</p>
          ) : (
            <MdOutlineDescription className="size-5 m-auto" />
          )}
        </ToggleItem>
        <ToggleItem value="invitation" active={activeSection}>
          {toggle ? (
            <p>Invitation</p>
          ) : (
            <MdOutlineContactMail className="size-5 m-auto" />
          )}
        </ToggleItem>
        <ToggleItem value="time" active={activeSection}>
          {toggle ? <p>Time</p> : <FaRegClock className="size-5 m-auto" />}
        </ToggleItem>
        <ToggleItem value="location" active={activeSection}>
          {toggle ? (
            <p>Location</p>
          ) : (
            <MdOutlineLocationOn className="size-5 m-auto" />
          )}
        </ToggleItem>
        <ToggleItem value="items" active={activeSection}>
          {toggle ? <p>Items</p> : <FaRegListAlt className="size-5 m-auto" />}
        </ToggleItem>
      </ul>
    </nav>
  );
}
