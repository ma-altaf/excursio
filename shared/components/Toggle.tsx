"use client";

import { ChangeEventHandler, useRef } from "react";
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
  const chkBtn = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        type="checkbox"
        name={id}
        id={id}
        className="hidden"
        checked={checked}
        onChange={onChange}
        ref={chkBtn}
      />
      <div
        className="toggleBackground"
        tabIndex={0}
        onKeyDown={(e) => e.key === " " && chkBtn.current?.click()}
      >
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
