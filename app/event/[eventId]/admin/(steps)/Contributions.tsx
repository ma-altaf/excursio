import {
  CollectiveItemsType,
  RequiredItemsType,
} from "@/features/events/services/firestore";
import RequiredItems from "@/shared/components/requiredItems/RequiredItems";
import CollectiveItems from "@/shared/components/collectiveItems/CollectiveItems";
import { useState } from "react";
import { useEventContext } from "../eventProvider";

export default function Contributions() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const requiredItemsState = useState<RequiredItemsType[]>([]);
  const collectiveItemsState = useState<CollectiveItemsType[]>([]);
  const [changed, setChanged] = useState(false);

  function updateContributions() {
    // TODO: upload 1.required items and 2.contribution items to db
  }

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center p-1">
      {eventData?.inProgress.contributions && <p>In progress</p>}
      <div className="w-full flex flex-col justify-center">
        <RequiredItems requiredItemsState={requiredItemsState} />
        <hr className="w-full border-1 my-2" />
        <CollectiveItems collectiveItemsState={collectiveItemsState} />

        <button
          className="p-button rounded-md bg-accent mt-2"
          onClick={() => updateContributions()}
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
