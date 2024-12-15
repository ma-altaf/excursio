import Spinner from "@/components/loading/Spinner";
import React from "react";

export default function AccountLoading() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <Spinner />
      <p className="mt-4">Loading, account information...</p>
    </section>
  );
}
