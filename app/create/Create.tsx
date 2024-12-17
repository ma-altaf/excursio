"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Create() {
  const origin = useSearchParams().get("origin") || "";

  return (
    <section className="w-full min-h-screen flex flex-col px-4 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl my-8">Create Excursion</h1>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        className="border-2 border-black rounded-md p-2 outline-accent"
        required
      />
      <label htmlFor="description" className="mt-4">
        Description: (Optional)
      </label>
      <textarea
        id="description"
        name="description"
        className="border-2 border-black rounded-md py-1 px-2 outline-accent"
        rows={4}
      />
      <span className="w-full flex flex-row justify-end my-4">
        <Link
          href={`/${origin}`}
          className="p-button rounded-md bg-gray-200 mr-2"
        >
          Exit
        </Link>
        <button className="p-button rounded-md bg-accent">
          Create Excusion
        </button>
      </span>
    </section>
  );
}
