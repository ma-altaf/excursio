import type { Metadata } from "next";
import EventContextProvider from "./eventProvider";
import EventPanel from "./EventPanel";

export const metadata: Metadata = {
  title: "Event",
  description: "Manage event.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventContextProvider>
      <main className="w-full min-h-screen">
        <EventPanel />
        {children}
      </main>
    </EventContextProvider>
  );
}
