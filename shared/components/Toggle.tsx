import { FaCheck } from "react-icons/fa";

export default function Toggle({ active }: { active: boolean }) {
  return (
    <div className="toggleBackground">
      <div
        className={`toggleForeground flex justify-center items-center ${
          active ? "toggleActive" : ""
        }`}
      >
        <FaCheck />
      </div>
    </div>
  );
}
