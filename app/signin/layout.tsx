import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Choose method of signing in",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
