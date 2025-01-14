import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decide event time",
  description: "View members time availability and set event time.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
