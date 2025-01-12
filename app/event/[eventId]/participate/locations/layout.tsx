import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participate in suggestions",
  description: "Participate in suggesting location to go to.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
