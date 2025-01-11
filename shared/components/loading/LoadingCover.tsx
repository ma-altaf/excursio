import Spinner from "./Spinner";

export default function LoadingCover({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner text={text} />
    </div>
  );
}
