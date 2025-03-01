import { VoteLocationType } from "@/features/events/services/firestore";
import RemovableLocItem from "./RemovableLocItem";

export default function SelectedSuggestions({
  selectedLocations,
  onRemove,
}: {
  selectedLocations: VoteLocationType[];
  onRemove: (title: string) => void;
}) {
  return (
    <div className="flow flex-col p-1 border-2 border-black rounded-md w-full">
      <p>Selected suggestion{selectedLocations.length > 1 && "s"}:</p>
      {selectedLocations.length === 0 ? (
        <p className="text-center">No suggestion selected.</p>
      ) : (
        <ul className="grid grid-flow-row gap-1">
          {selectedLocations.map((loc, i) => (
            <RemovableLocItem
              key={i}
              locationData={loc.location}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
