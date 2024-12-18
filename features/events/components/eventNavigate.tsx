"use server";

import { redirect } from "next/navigation";

export async function eventNavigate(eventId: string) {
  redirect(`/event/${eventId}/admin`);
}
