import Toggle from "@/shared/components/Toggle";
import { useEventContext } from "../eventProvider";
import { ChangeEvent, useEffect, useState } from "react";
import {
  LocationOptType,
  orderedEventSteps,
  updateLocation,
} from "@/features/events/services/firestore";
import LocationSuggestions from "@/shared/components/locationSuggestions/LocationSuggestions";

export default function Location() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [location, setLocation] = useState<LocationOptType>({
    num_suggestions: 0,
  });
  const [limit, setLimit] = useState(1);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (eventData!.locationOpt) {
      setLocation(eventData!.locationOpt);

      if (eventData!.locationOpt.num_suggestions != 0) {
        setLimit(eventData!.locationOpt.num_suggestions);
      }
    }
  }, []);

  useEffect(() => {
    setChanged(
      eventData?.locationOpt?.num_suggestions != location.num_suggestions
    );
  }, [eventData, location]);

  function limitNumChange(e: ChangeEvent<HTMLInputElement>) {
    let newLimit = Number(e.target.value);
    if (newLimit >= Number.MAX_VALUE) {
      newLimit = 9999999999;
    } else if (newLimit <= 0) {
      newLimit = 1;
    }

    setLimit(newLimit);
    setLocation((prev) => ({
      ...prev,
      num_suggestions: newLimit,
    }));
  }

  function updateLocationtionOpt(newLocationOpt: LocationOptType) {
    updateLocation(eventData!.eventId, newLocationOpt, eventData!.inProgress)
      .then(() => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");
          const inProgress = { ...eventData!.inProgress, location: false };

          return { ...prev, locationOpt: newLocationOpt, inProgress };
        });
        setActiveSection(orderedEventSteps[3]);
      })
      .catch((e) => {
        console.log(e);
        if (eventData?.locationOpt) {
          setLocation(eventData.locationOpt);
        }
      });
  }

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center">
      {eventData?.inProgress.time && <p>In progress</p>}
      <div className="w-full flex flex-col justify-center">
        <LocationSuggestions />

        <hr className="w-full border-1 my-2" />

        <label htmlFor="suggestionChk" className="flex flex-row items-center">
          <Toggle
            checked={location.num_suggestions == 0}
            id="suggestionChk"
            onChange={(e) => {
              setLocation((prev) => ({
                ...prev,
                num_suggestions: e.target.checked ? 0 : limit,
              }));
            }}
          />
          <p className="ml-4">No suggestion.</p>
        </label>

        {location.num_suggestions != 0 && (
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
          onClick={() => updateLocationtionOpt(location)}
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
