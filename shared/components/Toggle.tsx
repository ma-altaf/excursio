"use client";

import { ChangeEventHandler } from "react";
import { FaCheck } from "react-icons/fa";

export default function Toggle({
  checked,
  id,
  onChange,
}: {
  checked: boolean;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <input
        type="checkbox"
        name={id}
        id={id}
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <div className="toggleBackground">
        <div
          className={`toggleForeground flex justify-center items-center ${
            checked ? "toggleActive" : ""
          }`}
        >
          <FaCheck />
        </div>
      </div>
    </>
  );
}
