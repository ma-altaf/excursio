import { Dispatch, SetStateAction } from "react";

export default function YearPicker({
  dateUseState,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
}) {
  return <div>YearPicker</div>;
}
