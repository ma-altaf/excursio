import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Event",
  description: "Join the event.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
