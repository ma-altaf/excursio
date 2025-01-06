"use client";

import { getMember, MemberType } from "@/features/events/services/firestore";

import { lazy, Suspense, useEffect, useState } from "react";
import { useAuthContext } from "@/features/users/components/authProvider";
import Spinner from "@/shared/components/loading/Spinner";
import Link from "next/link";

const RenderDetails = lazy(() => import("./RenderDetails"));

export default function EventDetails({ eventId }: { eventId: string }) {
  const { authLoading, user } = useAuthContext();
  const [memberDetails, setMemberDetails] = useState<MemberType | undefined>(
    undefined
  );

  useEffect(() => {
    if (!authLoading && user) {
      getMember(eventId, user.uid).then((res) => setMemberDetails(res));
    }
  }, [authLoading, user, eventId]);

  if (!memberDetails)
    return (
      <div className="flex w-full py-4 justify-center items-center">
        {authLoading ? (
          <Spinner text="Loading user..." />
        ) : (
          <Link
            href={`/event/${eventId}/join`}
            className="p-button rounded-md bg-accent"
          >
            Join
          </Link>
        )}
      </div>
    );

  return (
    <Suspense fallback={<Spinner text="Loading Event details..." />}>
      <RenderDetails eventId={eventId} />
    </Suspense>
  );
}
