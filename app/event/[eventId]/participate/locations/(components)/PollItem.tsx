import { roboto } from "@/app/layout";
import { VoteLocationType } from "@/features/events/services/firestore";

export default function PollItem({
  length,
  poll,
}: {
  length: number;
  poll: VoteLocationType;
}) {
  const { title } = poll.location;

  return (
    <div className="flex flex-row">
      <span className="p-1 border-r-2 border-b-2 border-black">
        <pre className={`${roboto.className} antialiased`}>{title}</pre>
      </span>
      <div className="w-full relative border-b-2 border-black">
        <div
          className="bg-accent h-full absolute top-0 left-0 transition-all"
          style={{ width: `${(poll.vote / length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
