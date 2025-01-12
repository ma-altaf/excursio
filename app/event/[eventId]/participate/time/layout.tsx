import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participate in time availability",
  description: "Participate in providing your time availability.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
