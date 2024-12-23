import { Dispatch, SetStateAction } from "react";

export default function TimePanel({
  dateUseState,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
}) {
  return <div className="flex flex-row h-full"></div>;
}
