import {
  CollectiveItemsMapType,
  ContributionsOptType,
  getColItems,
  getReqItems,
  RequiredItemsType,
  setColItems,
  setReqItems,
  uploadContributionOpt,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import { useEventContext } from "../eventProvider";
import Toggle from "@/shared/components/Toggle";
import { redirect } from "next/navigation";
import RequiredItems from "./(components)/requiredItems/RequiredItems";
import CollectiveItems from "./(components)/collectiveItems/CollectiveItems";

export default function Contributions() {
  const { eventData, setEventData } = useEventContext();
  const requiredItemsState = useState<RequiredItemsType[]>([]);
  const collectiveItemsState = useState<CollectiveItemsMapType>(new Map());
  const [contributionsOpt, setContributionsOpt] =
    useState<ContributionsOptType>({
      requireTransport: false,
    });
  const [changed, setChanged] = useState(false);

  const { requireTransport } = contributionsOpt;
  const [requiredItemsList, setRequiredItemsList] = requiredItemsState;
  const [collectiveItemsList, setCollectiveItemsList] = collectiveItemsState;

  useEffect(() => {
    if (!eventData) {
      throw new Error("No event data");
    }

    if (eventData!.contributionsOpt) {
      setContributionsOpt(eventData!.contributionsOpt);
    }

    if (eventData?.reqItems) {
      setRequiredItemsList(structuredClone(eventData?.reqItems));
    } else {
      getReqItems(eventData?.eventId).then((res) => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");

          return { ...prev, reqItems: res };
        });
      });
    }

    if (eventData?.colItems) {
      setCollectiveItemsList(structuredClone(eventData?.colItems));
    } else {
      getColItems(eventData?.eventId).then((res) => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");

          return { ...prev, colItems: res };
        });
      });
    }
  }, [eventData]);

  useEffect(() => {
    setChanged(() => {
      if (
        eventData?.contributionsOpt?.requireTransport !=
          contributionsOpt.requireTransport ||
        !eventData.reqItems ||
        eventData.reqItems.length != requiredItemsList.length ||
        !eventData.colItems ||
        eventData.colItems.size !== collectiveItemsList?.size
      ) {
        return true;
      }

      for (let index = 0; index < eventData.reqItems.length; index++) {
        const reqItem = eventData.reqItems[index];

        if (
          !requiredItemsList.map((item) => item.title).includes(reqItem.title)
        ) {
          return true;
        }
      }

      for (const [, colItem] of eventData.colItems) {
        if (
          !collectiveItemsList.has(colItem.title) ||
          collectiveItemsList.get(colItem.title)?.amount !== colItem.amount ||
          collectiveItemsList.get(colItem.title)?.unit !== colItem.unit
        ) {
          return true;
        }
      }

      return false;
    });
  }, [eventData, contributionsOpt, requiredItemsList, collectiveItemsList]);

  function updateContributions(
    newContributionOpt: ContributionsOptType,
    reqItems: RequiredItemsType[],
    colItems: CollectiveItemsMapType
  ) {
    if (!eventData?.eventId) {
      throw new Error("no event ID");
    }

    if (!changed) {
      redirect(`/event/${eventData.eventId}`);
      return;
    }

    Promise.all([
      uploadContributionOpt(eventData!.eventId, newContributionOpt),
      setReqItems(eventData.eventId, reqItems),
      setColItems(eventData.eventId, colItems),
    ])
      .then(() => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");

          return {
            ...prev,
            contributionsOpt: newContributionOpt,
            reqItems,
            colItems,
          };
        });
      })
      .catch((e) => console.log(e));
  }

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center p-1">
      <div className="w-full flex flex-col justify-center">
        <RequiredItems requiredItemsState={requiredItemsState} />
        <hr className="w-full border-1 my-2" />
        <CollectiveItems collectiveItemsState={collectiveItemsState} />
        {/* <hr className="w-full border-1 my-2" />
        <label htmlFor="transport" className="flex flex-row items-center">
          <Toggle
            checked={requireTransport}
            id="transport"
            onChange={(e) => {
              setContributionsOpt((prev) => ({
                ...prev,
                requireTransport: e.target.checked,
              }));
            }}
          />
          <p className="ml-4">Require transport contributions.</p>
        </label> */}

        <button
          className="p-button rounded-md bg-accent mt-2"
          onClick={() =>
            updateContributions(
              contributionsOpt,
              requiredItemsList,
              collectiveItemsList
            )
          }
        >
          {changed ? "Submit" : "Exit"}
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
