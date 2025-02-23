import "./globals.css";
import { Roboto } from "next/font/google";
import AuthContextProvider from "@/features/users/components/authProvider";

export const myFont = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Excursio</title>
        <meta name="description" content="Excursion planning and management" />
      </head>
      <body className={`${myFont.className} antialiased`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
