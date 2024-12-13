"use client";

import React from "react";
import { logOut } from "../(services)/auth";

export default function Account() {
  return (
    <section>
      <button
        className="p-button rounded-md bg-black text-white"
        onClick={() => logOut()}
      >
        signOut
      </button>
    </section>
  );
}
