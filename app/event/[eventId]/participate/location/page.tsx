"use client";

import { LocationType } from "@/features/events/services/firestore";
import NewSuggestion from "../../participate/location/(components)/NewSuggestion";

export default function Location() {
  // TODO: finalize location

  function AddSuggestion(locationData: LocationType) {
    // TODO: Add the suggestion for review to be put on the poll
    return "";
  }

  return (
    <section className="w-full min-h-screen flex flex-col p-2 md:px-[10%] lg:px-[20%]">
      <NewSuggestion onSubmit={AddSuggestion} />
    </section>
  );
}
