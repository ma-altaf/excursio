import Spinner from "@/shared/components/loading/Spinner";
import React from "react";

export default function EventLoading() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <p className="text-xl mb-2">Loading event information...</p>
      <Spinner />
    </main>
  );
}
