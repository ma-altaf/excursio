"use client";

import { LocationType } from "@/features/events/services/firestore";
import NewSuggestion from "./NewSuggestion";
import { Dispatch, SetStateAction } from "react";
import LocationItem from "./LocationItem";

export default function LocationSuggestions({
  locationsListState,
}: {
  locationsListState: [
    LocationType[],
    Dispatch<SetStateAction<LocationType[]>>
  ];
}) {
  const [locationsList, setLocationsList] = locationsListState;

  function locationSubmit(locationData: LocationType) {
    const { title } = locationData;
    const error = [];

    if (!title) {
      error.push("Title is required.");
    }

    if (locationsList.map((el) => el.title).includes(title)) {
      error.push("location already exists.");
    }

    if (error.length != 0) {
      return error.join(" | ");
    }

    setLocationsList((prev) => [...prev, locationData]);

    return "";
  }

  function removeItem(title: string) {
    setLocationsList((prev) => {
      return prev.filter((loc) => loc.title != title);
    });
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-center mb-2">Add your suggestions</h2>
      <NewSuggestion onSubmit={locationSubmit} />
      <div className="flex flex-col overflow-auto p-2 rounded-md border-2 border-black mt-2">
        {locationsList.length == 0 ? (
          <p className="text-center">You have no suggestions.</p>
        ) : (
          <p>Suggestions:</p>
        )}

        {locationsList.map((locationData, i) => (
          <LocationItem
            key={i}
            locationData={locationData}
            onRemove={removeItem}
          />
        ))}
      </div>
    </div>
  );
}
