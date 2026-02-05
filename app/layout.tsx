import type { Metadata, Viewport } from "next";
import "./globals.css";
import FontAwesomeLoader from "@/components/FontAwesomeLoader";

export const metadata: Metadata = {
  title: "HeartMatch - Find Your Perfect Match",
  description: "Join thousands of singles looking for love on HeartMatch",
  keywords: ["dating", "знакомства", "love", "relationships", "match"],
  authors: [{ name: "HeartMatch" }],
  openGraph: {
    title: "HeartMatch - Find Your Perfect Match",
    description: "Join thousands of singles looking for love on HeartMatch",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        {/* Структурированные данные для SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "HeartMatch",
              "description": "Современная платформа для знакомств",
              "url": "https://heartmatch.com",
              "applicationCategory": "DatingApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "RUB"
              }
            })
          }}
        />
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
