import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participate in locations",
  description: "Participate in suggesting locations to go to.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
