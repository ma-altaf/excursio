import Link from "next/link";
import React from "react";

export default function NotSetup() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Event not setup yet</h1>
      <p className="my-4">
        Wait for the organizer to setup the invitation settings for the Event.
      </p>
      <Link href="/" className="p-button rounded-full bg-accent">
        Go to Homepage
      </Link>
    </section>
  );
}
