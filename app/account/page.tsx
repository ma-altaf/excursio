"use client";

import { logOut } from "@/services/firebase";
import React from "react";

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
