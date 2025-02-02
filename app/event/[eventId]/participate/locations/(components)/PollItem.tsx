import { PollType } from "@/features/events/services/firestore";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function PollItem({
  length,
  poll,
}: {
  length: number;
  poll: PollType;
}) {
  const { title, vote } = poll;

  return (
    <div className="flex flex-row">
      <span className="p-1 border-r-2 border-b-2 border-black">
        <pre className={`${roboto.className} antialiased`}>{title}</pre>
      </span>
      <div className="w-full relative border-b-2 border-black">
        <div
          className="bg-accent h-full absolute top-0 left-0 transition-all"
          style={{ width: `${(vote / length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
