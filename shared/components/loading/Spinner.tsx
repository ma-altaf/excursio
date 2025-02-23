export default function Spinner({
  text,
  size = "3rem",
  marginTop = "1rem",
}: {
  text?: string;
  size?: string;
  marginTop?: string;
}) {
  return (
    <span className="flex flex-col justify-center items-center">
      <div
        className={`animate-spin aspect-square rounded-full border-2 border-gray-200 border-r-black`}
        style={{ width: size }}
      ></div>
      {text && <p style={{ marginTop }}>{text}</p>}
    </span>
  );
}
