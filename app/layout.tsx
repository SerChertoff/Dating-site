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
        {/* Критические preconnect - только для критических ресурсов */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload критического hero изображения для улучшения LCP */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          fetchPriority="high"
        />
        {/* Некритические preconnect - отложены через dns-prefetch */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://randomuser.me" />
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
