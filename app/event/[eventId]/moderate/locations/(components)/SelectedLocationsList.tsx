import { LocationType } from "@/features/events/services/firestore";
import RemovableLocItem from "./RemovableLocItem";

export default function SelectedSuggestions({
  selectedLocations,
  onRemove,
}: {
  selectedLocations: LocationType[];
  onRemove: (title: string) => void;
}) {
  return (
    <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
      <p>Selected locations:</p>
      {selectedLocations.length === 0 ? (
        <p className="text-center">No location selected.</p>
      ) : (
        <ul>
          {selectedLocations.map((loc, i) => (
            <RemovableLocItem key={i} locationData={loc} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}
