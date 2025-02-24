import {
  LocationType,
  MemberType,
  VoteLocationType,
} from "@/features/events/services/firestore";
import SuggestedItem from "./SuggestedItem";

export default function SuggestedLocations({
  members,
  onAdd,
  selectedLocations,
}: {
  members: MemberType[];
  onAdd: (location: LocationType) => void;
  selectedLocations: VoteLocationType[];
}) {
  const membersSuggestion = members.filter((el) => el.locations !== undefined);
  const selectedTitle = selectedLocations.map((v) => v.location.title);

  return (
    <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
      <p>Suggestions:</p>
      <ul className="grid grid-flow-row gap-1 mt-1">
        {membersSuggestion.map((member, i) => (
          <li
            className="grid grid-flow-row gap-1 p-1 rounded-md border-2 border-black"
            key={i}
          >
            <b>{member.displayName}:</b>
            {member.locations!.map((suggestion, j) => (
              <SuggestedItem
                key={j}
                locationData={suggestion}
                onAdd={onAdd}
                isSelected={selectedTitle.includes(suggestion.title)}
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
