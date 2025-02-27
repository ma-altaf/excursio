import { myFont } from "@/shared/services/utils";
import "./globals.css";
import AuthContextProvider from "@/features/users/components/authProvider";

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
        <meta property="og:image" content="/images/logo-512x512.png" />
      </head>
      <body className={`${myFont.className} antialiased`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
