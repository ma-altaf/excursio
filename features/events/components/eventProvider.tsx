import { createContext, use } from "react";
import { EventType, getEvent } from "../services/firestore";

const EventContext = createContext<EventType | undefined>(undefined);

export default function EventContextProvider({
  eventId,
  children,
}: Readonly<{
  eventId: string;
  children: React.ReactNode;
}>) {
  const eventData = use(getEvent(eventId));

  return (
    <EventContext.Provider value={eventData}>{children}</EventContext.Provider>
  );
}

export function useEventContext() {
  const context = use(EventContext);
  if (!context) {
    throw new Error("useEventContext must be within a EventContextProvider");
  }
  return context;
}
