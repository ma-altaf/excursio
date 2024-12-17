import type { Metadata } from "next";
import User from "./User";

export const metadata: Metadata = {
  title: "User",
  description: "View user details and events",
};

export default async function Layout({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  return <User uid={uid} />;
}
