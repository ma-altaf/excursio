import Toggle from "@/shared/components/Toggle";
import { useEventContext } from "../eventProvider";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getLocations,
  LocationOptType,
  LocationType,
  orderedEventSteps,
  setLocations,
  uploadLocationOpt,
} from "@/features/events/services/firestore";
import LocationSuggestions from "@/features/events/components/locationSuggestions/LocationSuggestions";

export default function Location() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [locationOpt, setLocationOpt] = useState<LocationOptType>({
    num_suggestions: 0,
  });
  const [limit, setLimit] = useState(1);
  const locationsListState = useState<LocationType[]>([]);
  const [changed, setChanged] = useState(false);

  const [locationsList, setLocationsList] = locationsListState;

  useEffect(() => {
    if (!eventData) {
      throw new Error("No event data");
    }

    if (eventData!.locationOpt) {
      setLocationOpt(eventData!.locationOpt);

      if (eventData!.locationOpt.num_suggestions != 0) {
        setLimit(eventData!.locationOpt.num_suggestions);
      }
    }

    if (eventData?.locations) {
      setLocationsList(structuredClone(eventData?.locations));
    } else {
      getLocations(eventData?.eventId).then((res) => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");

          return { ...prev, locations: res };
        });
      });
    }
  }, [eventData]);

  useEffect(() => {
    setChanged(() => {
      if (
        eventData?.locationOpt?.num_suggestions !=
          locationOpt.num_suggestions ||
        !eventData.locations ||
        eventData.locations.length != locationsList.length
      )
        return true;

      for (let index = 0; index < eventData.locations.length; index++) {
        const loc = eventData.locations[index];

        if (
          !locationsList.map((l) => l.title).includes(loc.title) ||
          !locationsList.map((l) => l.isOnline).includes(loc.isOnline) ||
          !locationsList.map((l) => l.link).includes(loc.link)
        ) {
          return true;
        }
      }

      return false;
    });
  }, [eventData, locationOpt, locationsList]);

  function limitNumChange(e: ChangeEvent<HTMLInputElement>) {
    let newLimit = Number(e.target.value);
    if (newLimit >= Number.MAX_VALUE) {
      newLimit = 9999999999;
    } else if (newLimit <= 0) {
      newLimit = 1;
    }

    setLimit(newLimit);
    setLocationOpt((prev) => ({
      ...prev,
      num_suggestions: newLimit,
    }));
  }

  function updateLocation(newLocationOpt: LocationOptType) {
    if (!changed) {
      setActiveSection(orderedEventSteps[4]);
      return;
    }

    if (!eventData?.eventId) {
      throw new Error("no event ID");
    }

    Promise.all([
      uploadLocationOpt(
        eventData!.eventId,
        newLocationOpt,
        eventData!.inProgress
      ),
      setLocations(eventData.eventId, locationsList),
    ])
      .then(() => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");
          const inProgress = { ...eventData!.inProgress, location: false };

          return {
            ...prev,
            locationOpt: newLocationOpt,
            inProgress,
            locations: locationsList,
          };
        });
        setActiveSection(orderedEventSteps[4]);
      })
      .catch((e) => console.log(e));
  }

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center p-1">
      {eventData?.inProgress.times && <p>In progress</p>}
      <div className="w-full flex flex-col justify-center">
        <LocationSuggestions locationsListState={locationsListState} />

        <hr className="w-full border-1 my-2" />

        <label htmlFor="suggestionChk" className="flex flex-row items-center">
          <Toggle
            checked={locationOpt.num_suggestions == 0}
            id="suggestionChk"
            onChange={(e) => {
              setLocationOpt((prev) => ({
                ...prev,
                num_suggestions: e.target.checked ? 0 : limit,
              }));
            }}
          />
          <p className="ml-4">No suggestion from members.</p>
        </label>

        {locationOpt.num_suggestions != 0 && (
          <>
            <label htmlFor="limit">
              Maximum number of suggestion per member:
            </label>
            <input
              type="number"
              id="limit"
              name="limit"
              min={1}
              max={Number.MAX_VALUE - 1}
              value={String(limit)}
              onChange={limitNumChange}
              className="border-2 border-black rounded-md py-1 px-2 outline-accent"
            />
          </>
        )}

        <button
          className="p-button rounded-md bg-accent mt-2"
          onClick={() => updateLocation(locationOpt)}
        >
          {changed ? "Submit" : "Next"}
        </button>

        {changed && (
          <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
            *Unsubmitted Changes, please submit your changes to save them.
          </p>
        )}
      </div>
    </section>
  );
}
