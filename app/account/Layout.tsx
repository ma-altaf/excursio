import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Account",
  description: "Change account deatils.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
