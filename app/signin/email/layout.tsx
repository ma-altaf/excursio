import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enter Email",
  description: "Enter email to send sign up link.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
