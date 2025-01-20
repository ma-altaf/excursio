import React from "react";

export default function ProgressBar({
  current,
  total,
  userAmount = 0,
}: {
  current: number;
  total: number;
  userAmount?: number;
}) {
  return (
    <div className="w-full rounded-full h-2 bg-gray-200 overflow-hidden relative">
      <div
        className="bg-green-300 h-full rounded-full absolute"
        style={{
          width: `${(current / total) * 100}%`,
        }}
      ></div>

      <div
        className="bg-accent h-full rounded-full absolute"
        style={{
          width: `${((current - userAmount) / total) * 100}%`,
        }}
      ></div>
    </div>
  );
}
