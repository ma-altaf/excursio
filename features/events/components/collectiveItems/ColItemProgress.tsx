import React from "react";
import { CollectiveItemsType } from "../../services/firestore";
import ProgressBar from "@/shared/components/ProgressBar";
import { roboto } from "@/app/layout";

export default function ColItemProgress({
  colItemData,
}: {
  colItemData: CollectiveItemsType;
}) {
  const { title, amount, unit, current } = colItemData;

  return (
    <div className="flex flex-col py-1 px-2 rounded-md bg-gray-100">
      <p>{title}</p>
      <span className="flex flex-col items-end mt-1">
        <ProgressBar current={current} total={amount} />
        <pre className={`${roboto.className} antialiased text-sm`}>
          {current}/{amount} {unit}
        </pre>
      </span>
    </div>
  );
}
