import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soundspire Media | Next-Gen Audio Advertising Agency",
  description: "Cutting-edge podcast and digital audio advertising agency. We help brands amplify their presence through strategic media buying, audience targeting, and professional audio production.",
  keywords: "podcast advertising, digital audio advertising, media buying, audio production, podcast marketing, audio ads, digital marketing, brand amplification",
  authors: [
    { name: "Kristen Valentine", url: "https://www.linkedin.com/in/kristen-valentine-coseo-6675132a/" },
    { name: "Ally Kandel", url: "https://www.linkedin.com/in/alisonkandel/" }
  ],
  openGraph: {
    title: "Soundspire Media | Next-Gen Audio Advertising Agency",
    description: "Cutting-edge podcast and digital audio advertising agency. We help brands amplify their presence through strategic media buying, audience targeting, and professional audio production.",
    url: "https://soundspiremedia.com",
    siteName: "Soundspire Media",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soundspire Media - Next-Gen Audio Advertising",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soundspire Media | Next-Gen Audio Advertising Agency",
    description: "Cutting-edge podcast and digital audio advertising agency. We help brands amplify their presence through strategic media buying, audience targeting, and professional audio production.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Soundspire Media",
    "url": "https://soundspiremedia.com",
    "logo": "https://soundspiremedia.com/images/logo.png",
    "description": "Cutting-edge podcast and digital audio advertising agency. We help brands amplify their presence through strategic media buying, audience targeting, and professional audio production.",
    "sameAs": [
      "https://www.linkedin.com/company/soundspire-media",
      "https://twitter.com/soundspiremedia",
      "https://www.facebook.com/soundspiremedia",
      "https://www.instagram.com/soundspiremedia"
    ],
    "founder": [
      {
        "@type": "Person",
        "name": "Kristen Valentine",
        "url": "https://www.linkedin.com/in/kristen-valentine-coseo-6675132a/"
      },
      {
        "@type": "Person",
        "name": "Ally Kandel",
        "url": "https://www.linkedin.com/in/alisonkandel/"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8C39E0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/logo.png" as="image" />
        <link rel="preload" href="/images/og-image.jpg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js');
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
