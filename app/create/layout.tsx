import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create excursion",
  description: "Create a new excursion.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
