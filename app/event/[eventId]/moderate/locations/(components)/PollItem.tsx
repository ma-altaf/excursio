import { PollType } from "./Poll";

export default function PollItem({
  length,
  poll,
}: {
  length: number;
  poll: PollType;
}) {
  const { title, vote } = poll;

  return (
    <div className="w-full p-1 relative border-b-2 border-black">
      <div
        className="bg-accent h-full absolute top-0 left-0 transition-all -z-10"
        style={{ width: `${(vote / length) * 100}%` }}
      ></div>
      <p className="w-fit">{title}</p>
    </div>
  );
}
