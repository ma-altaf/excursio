import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Sign up",
  description: "Complete sign up from email authentication link",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
