import type { Metadata } from "next";
import "./globals.css";
import FontAwesomeLoader from "@/components/FontAwesomeLoader";

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
        {/* Preconnect для ускорения подключения к CDN */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        {/* Fallback для браузеров без JavaScript */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
        </noscript>
      </head>
      <body>
        <FontAwesomeLoader />
        {children}
      </body>
    </html>
  );
}
