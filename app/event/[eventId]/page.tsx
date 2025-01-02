import {
  getColItems,
  getEvent,
  getReqItems,
} from "@/features/events/services/firestore";
import EditBtn from "./EditBtn";
import ColItemProgress from "@/features/events/components/collectiveItems/ColItemProgress";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);
  const eventReqItems = await getReqItems(eventId);
  const eventColItems = await getColItems(eventId);

  if (!eventData)
    return (
      <section className="flex flex-col w-full min-h-screen">
        <h1>Could not found event</h1>
      </section>
    );

  const { ownerId, title, description } = eventData;

  return (
    <section className="w-full min-h-screen flex flex-col md:px-[10%] lg:px-[20%]">
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h1 className="text-3xl p-4">{title}</h1>
        <EditBtn ownerId={ownerId} eventId={eventId} />
      </div>
      <p>{description}</p>

      {eventReqItems.length != 0 && (
        <>
          <hr className="w-full border-b-1 my-1" />

          <h2 className="font-bold">Required items to bring</h2>
          <ul className="flex flex-col px-1">
            {eventReqItems.map((reqItemData, i) => (
              <li key={i}>
                <b>{i + 1}.</b> {reqItemData.title}
              </li>
            ))}
          </ul>
        </>
      )}

      <hr className="w-full border-b-1 my-1" />
      <h2 className="font-bold">Time</h2>

      <hr className="w-full border-b-1 my-1" />
      <h2 className="font-bold">Location</h2>

      {eventColItems.length != 0 && (
        <>
          <hr className="w-full border-b-1 my-1" />

          <h2 className="font-bold">Required items to bring</h2>
          <ul className="flex flex-col px-1">
            {eventColItems.map((colItemData, i) => (
              <li key={i} className="my-1">
                <ColItemProgress colItemData={colItemData} />
              </li>
            ))}
          </ul>
        </>
      )}

      <hr className="w-full border-b-1 my-1" />
      <h2 className="font-bold">Transport</h2>
    </section>
  );
}
