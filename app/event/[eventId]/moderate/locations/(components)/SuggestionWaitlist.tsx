import { MemberType } from "@/features/events/services/firestore";

export default function SuggestionWaitlist({
  members,
}: {
  members: MemberType[];
}) {
  const waitingMembers = members.filter((el) => el.locations === undefined);

  return (
    <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
      {waitingMembers.length === 0 ? (
        <p className="text-center">All members have voted.</p>
      ) : (
        <>
          <span className="flex flex-row">
            <p>Waiting for response:</p>
            <p className="ml-2 px-2 bg-gray-100 rounded-full">
              {waitingMembers.length}
            </p>
          </span>
          <ul className="flex flex-row flex-wrap mt-1">
            {waitingMembers.map((el, i) => (
              <li
                key={i}
                className="m-1 px-3 rounded-full bg-gray-100 flex flex-row items-center"
              >
                <p>{el.displayName}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
