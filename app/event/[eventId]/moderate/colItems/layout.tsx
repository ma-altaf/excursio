import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moderate Contributions",
  description: "Monitor who is making contributions.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
