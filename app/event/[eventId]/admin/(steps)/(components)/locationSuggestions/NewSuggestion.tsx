"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LocationType } from "@/features/events/services/firestore";
import Toggle from "@/shared/components/Toggle";

export default function NewSuggestion({
  onSubmit,
}: {
  onSubmit: (locationData: LocationType) => string;
}) {
  const [locationData, setLocationData] = useState<LocationType>({
    title: "",
    isOnline: false,
    link: "",
  });

  const [error, setError] = useState("");

  const { title, isOnline, link } = locationData;

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [locationData]);

  return (
    <div className="flex flex-col border-2 border-black rounded-md p-2">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) =>
          setLocationData((prev) => ({ ...prev, title: e.target.value }))
        }
        className="border-2 border-black rounded-md py-1 px-2 outline-accent"
        placeholder="Cool location"
      />

      <hr className="w-full border-1 my-2" />

      <label htmlFor="onlineChk" className="flex flex-row items-center">
        <Toggle
          checked={isOnline}
          id="onlineChk"
          onChange={(e) =>
            setLocationData((prev) => ({ ...prev, isOnline: e.target.checked }))
          }
        />
        <p className="ml-2">Online</p>
      </label>

      {isOnline ? (
        <span className="flex flex-col">
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={(e) =>
              setLocationData((prev) => ({ ...prev, link: e.target.value }))
            }
            className="border-2 border-black rounded-md py-1 px-2 outline-accent"
            placeholder={process.env.NEXT_PUBLIC_URL}
          />
        </span>
      ) : (
        <span className="flex flex-col">
          <label htmlFor="link">Location:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={(e) =>
              setLocationData((prev) => ({ ...prev, link: e.target.value }))
            }
            className="border-2 border-black rounded-md py-1 px-2 outline-accent"
            placeholder="https://www.google.com/maps/place/Mauritius/@-20.2417545,57.317233,99574m/data=!3m1!1e3!4m6!3m5!1s0x217c504df94474c9:0x4203d9c2116bd031!8m2!3d-20.348404!4d57.552152!16zL20vMDR2czk?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
          />
          <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
            *Share the link to an online map (ex:{" "}
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://www.google.com/maps"
              target="_blank"
            >
              Google Map
            </Link>
            ).
          </p>
        </span>
      )}

      <button
        className="p-button w-full rounded-md bg-gray-200 mt-2 hover:bg-gray-300"
        onClick={() => {
          setError(onSubmit(locationData));
        }}
      >
        Add
      </button>

      {error && (
        <p className="mt-2 py-1 px-2 bg-red-100 rounded-md border-2 border-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
