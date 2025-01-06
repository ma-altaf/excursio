import { LocationType } from "@/features/events/services/firestore";
import SelectedLocationItems from "./SelectedLocationItems";

export default function LocationSelected({
  selectedLocations,
}: {
  selectedLocations: LocationType[];
}) {
  return (
    <div className="flex flex-col">
      {selectedLocations.map((location, i) => (
        <SelectedLocationItems key={i} location={location} />
      ))}
    </div>
  );
}
