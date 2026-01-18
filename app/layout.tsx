import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeartMatch - Find Your Perfect Match",
  description: "Join thousands of singles looking for love on HeartMatch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
