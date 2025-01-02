import React from "react";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="w-full rounded-full h-2 bg-gray-200 overflow-hidden">
      <div
        className="bg-accent h-full rounded-full"
        style={{
          width: `${(current / total) * 100}%`,
        }}
      ></div>
    </div>
  );
}
