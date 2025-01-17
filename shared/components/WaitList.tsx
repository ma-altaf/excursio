import { MemberType } from "@/features/events/services/firestore";

export default function WaitList({
  headerText,
  completionText,
  waitingMembers,
}: {
  headerText: string;
  completionText: string;
  waitingMembers: MemberType[];
}) {
  return (
    <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
      {waitingMembers.length === 0 ? (
        <p className="text-center">{completionText}</p>
      ) : (
        <>
          <span className="flex flex-row">
            <p>{headerText}</p>
            <p className="ml-2 px-2 bg-gray-100 rounded-full">
              <b>{waitingMembers.length}</b> Remaining
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
