import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moderate location",
  description: "Moderate location suggestions.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
