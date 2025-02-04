"use client";

import {
  addSuggestion,
  LocationType,
} from "@/features/events/services/firestore";
import Link from "next/link";
import { useState } from "react";
import NewSuggestion from "./(components)/NewSuggestion";
import SuggestionItem from "./(components)/SuggestionItem";
import { FaArrowLeft } from "react-icons/fa";

export default function Suggestion({
  eventId,
  uid,
  num_suggestions,
}: {
  eventId: string;
  uid: string;
  num_suggestions: number;
}) {
  const [suggestionsList, setSuggestionsList] = useState<LocationType[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function AddSuggestion(locationData: LocationType) {
    const { title } = locationData;
    const error = [];

    if (!title) {
      error.push("Title is required.");
    }

    if (suggestionsList.map((el) => el.title).includes(title)) {
      error.push("location already exists.");
    }

    if (error.length != 0) {
      return error.join(" | ");
    }

    setSuggestionsList((prev) => [...prev, locationData]);

    return "";
  }

  function removeItem(title: string) {
    setSuggestionsList((prev) => {
      return prev.filter((sug) => sug.title != title);
    });
  }

  function submit(suggestionsList: LocationType[]) {
    addSuggestion(eventId, uid, suggestionsList)
      .then(() => setSuccess(true))
      .catch((e) => setError(e.message));
  }

  if (success)
    return (
      <section className="w-full min-h-screen flex flex-col justify-center items-center">
        <p>Thank you for your suggestions!</p>
        <Link
          className="p-button rounded-md bg-accent mt-4"
          href={`/event/${eventId}`}
        >
          Go to Event
        </Link>
      </section>
    );

  return (
    <section className="w-full min-h-screen flex flex-col p-2 md:px-[10%] lg:px-[20%]">
      <span className="m-4 w-full relative flex justify-center items-center">
        <Link
          href={`/event/${eventId}`}
          className="absolute -translate-y-1/2 top-1/2 left-2 px-2 py-1 bg-gray-100 rounded-md flex flex-row items-center"
        >
          <FaArrowLeft className="mr-2 size-3" />
          Back
        </Link>
        <h1 className="text-3xl">Suggest Locations</h1>
      </span>

      {suggestionsList.length >= num_suggestions ? (
        <div className="p-2 rounded-md border-2 border-black text-center">
          Remove a suggestion to add another.
        </div>
      ) : (
        <NewSuggestion
          limit={num_suggestions - suggestionsList.length}
          onSubmit={AddSuggestion}
        />
      )}

      <div className="flex flex-col overflow-auto p-2 rounded-md border-2 border-black mt-2">
        {suggestionsList.length == 0 ? (
          <p className="text-center">You have no suggestions.</p>
        ) : (
          <p>Suggestions:</p>
        )}

        {suggestionsList.map((locationData, i) => (
          <SuggestionItem
            key={i}
            locationData={locationData}
            onRemove={removeItem}
          />
        ))}
      </div>

      <button
        className="p-button rounded-md bg-accent my-2"
        onClick={() => submit(suggestionsList)}
      >
        Submit
      </button>

      {error && (
        <p className="p-1 rounded-md bg-gray-100 border-2 border-gray-200 mb-2">
          {error}
        </p>
      )}

      <p className="p-1 rounded-md bg-gray-100 border-2 border-gray-200">
        NOTE: Cannot make changes or add more locations once submitted.
      </p>
    </section>
  );
}
