import { MemberType } from "@/features/events/services/firestore";
import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

export default function MemberTime({
  members,
  useStateMembers,
}: {
  members: MemberType[];
  useStateMembers: [Set<string>, Dispatch<SetStateAction<Set<string>>>];
}) {
  const [membersId, setMembersId] = useStateMembers;

  return (
    <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
      {members.length === 0 ? (
        <p className="text-center">No members available time yet.</p>
      ) : (
        <>
          <span className="flex flex-row">
            <p>Members available times:</p>
            <p className="mx-2 px-2 bg-gray-100 rounded-full">
              <b>{members.length}</b>
            </p>
            {membersId.size !== 0 && (
              <button
                className="px-1 flex flex-row items-center rounded-md bg-gray-100"
                onClick={() => {
                  setMembersId((prev) => {
                    prev.clear();
                    return new Set(prev);
                  });
                }}
              >
                Filters
                <IoClose className="size-5" />
              </button>
            )}
          </span>
          <ul className="flex flex-row flex-wrap mt-1">
            {members.map((el, i) => (
              <li
                key={i}
                className={`m-1 px-3 rounded-full  flex flex-row items-center ${
                  membersId.has(el.uid) ? "bg-accent" : "bg-gray-100"
                }`}
              >
                <button
                  onClick={() => {
                    if (membersId.has(el.uid)) {
                      setMembersId((prev) => {
                        prev.delete(el.uid);
                        return new Set(prev);
                      });
                    } else {
                      setMembersId((prev) => {
                        prev.add(el.uid);
                        return new Set(prev);
                      });
                    }
                  }}
                >
                  <p>{el.displayName}</p>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
