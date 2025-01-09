import type { Metadata } from "next";
import EventContextProvider from "./eventProvider";
import EventPanel from "./EventPanel";

export const metadata: Metadata = {
  title: "Manage Event",
  description: "Change event settings.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventContextProvider>
      <main className="w-full min-h-screen flex flex-row relative pr-16 md:pr-0">
        {children}
        <EventPanel />
      </main>
    </EventContextProvider>
  );
}
