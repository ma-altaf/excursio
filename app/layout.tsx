import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import AuthContextProvider from "@/features/users/components/authProvider";

export const metadata: Metadata = {
  title: "Excursio",
  description: "Excursion planning and management",
};

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
