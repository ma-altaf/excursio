import { LocationType } from "@/features/events/services/firestore";
import SelectedLocationItems from "./SelectedLocationItems";

export default function LocationSelected({
  selectedLocations,
}: {
  selectedLocations: LocationType[];
}) {
  return (
    <div className="flex flex-col w-full">
      {selectedLocations.map((location, i) => (
        <span key={i}>
          <span className="flex flex-row">
            <p className="flex items-center justify-center border-r-2 px-2 mr-2">
              {i + 1}
            </p>
            <SelectedLocationItems location={location} />
          </span>
          {i !== selectedLocations.length - 1 && (
            <hr className="w-full border-b-2 my-1" />
          )}
        </span>
      ))}
    </div>
  );
}
