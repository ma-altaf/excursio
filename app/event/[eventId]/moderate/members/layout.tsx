import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moderate members",
  description: "Moderate the members of the event.",
};

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
