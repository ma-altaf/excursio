export default function Spinner({ text }: { text?: string }) {
  return (
    <span className="flex flex-col justify-center items-center">
      <div
        className={`animate-spin w-12 aspect-square rounded-full border-2 border-gray-200 border-r-black`}
      ></div>
      {text && <p className="mt-4">{text}</p>}
    </span>
  );
}
