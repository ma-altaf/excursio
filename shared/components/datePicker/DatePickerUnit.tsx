export default function DateUnit({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) {
  return (
    <span className="flex justify-center items-center p-1 w-full">
      <button className="flex justify-center items-center bg-gray-100 rounded-md size-8 hover:bg-gray-200 transition-all">
        {text}
      </button>
    </span>
  );
}
