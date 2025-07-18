import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from "./AuthContext";
import { LanguageProvider } from "./LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Middle Earth - LOTR Website",
  description: "Yüzüklerin Efendisi temalı web sitesi - Karakterler, hikayeler, galeri ve e-ticaret",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LOTR",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fbbf24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="application-name" content="LOTR" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LOTR" />
        <meta name="description" content="Yüzüklerin Efendisi temalı web sitesi" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#fbbf24" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#fbbf24" />

        <link rel="apple-touch-icon" href="/images/one-ring.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/one-ring.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/one-ring.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/images/one-ring.png" color="#fbbf24" />
        <link rel="shortcut icon" href="/images/one-ring.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://middle-earth-project.vercel.app" />
        <meta name="twitter:title" content="Middle Earth - LOTR Website" />
        <meta name="twitter:description" content="Yüzüklerin Efendisi temalı web sitesi" />
        <meta name="twitter:image" content="https://middle-earth-project.vercel.app/images/one-ring.png" />
        <meta name="twitter:creator" content="@lotr_website" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Middle Earth - LOTR Website" />
        <meta property="og:description" content="Yüzüklerin Efendisi temalı web sitesi" />
        <meta property="og:site_name" content="Middle Earth" />
        <meta property="og:url" content="https://middle-earth-project.vercel.app" />
        <meta property="og:image" content="https://middle-earth-project.vercel.app/images/one-ring.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="pt-16 sm:pt-20">{children}</main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
