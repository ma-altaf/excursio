import type { Metadata } from "next";
import User from "./User";
import { getUser } from "@/features/users/services/firestore";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "User",
  description: "View user details and events",
};

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const user = await getUser(uid);

  if (!user) notFound();

  metadata.title = user.username;

  return <User user={user} />;
}
