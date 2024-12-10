"use client";

import { logOut } from "@/services/firebase";
import OwnerTag from "../create/ownerTag";

export default function Account() {
  return (
    <div>
      <p>account</p>
      <OwnerTag origin="account" />
      <button
        className="p-button rounded-md bg-black text-white"
        onClick={() => logOut()}
      >
        signOut
      </button>
    </div>
  );
}
