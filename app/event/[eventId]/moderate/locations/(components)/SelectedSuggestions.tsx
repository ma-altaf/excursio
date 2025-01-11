import { VoteLocationType } from "@/features/events/services/firestore";
import ToVoteItem from "./ToVoteItem";

export default function SelectedSuggestions({
  selectedLocations,
  onRemove,
}: {
  selectedLocations: VoteLocationType[];
  onRemove: (title: string) => void;
}) {
  return (
    <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
      <p>Selected suggestions:</p>
      {selectedLocations.length === 0 ? (
        <p className="text-center">No suggestion selected.</p>
      ) : (
        <ul>
          {selectedLocations.map((loc, i) => (
            <ToVoteItem
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
