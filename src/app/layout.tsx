import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { PerformanceMonitor } from "@/components/ui/PerformanceMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Volunteer Club - Making a Difference Together",
  description: "Join our volunteer club and make a positive impact in your community. Discover ongoing projects, join activities, and connect with like-minded volunteers.",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: "Volunteer Club - Making a Difference Together",
    description: "Join our volunteer club and make a positive impact in your community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/hero.png" as="image" />
        <link rel="preload" href="/logo.jpg" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div className="h-16 bg-white shadow-sm" />}>
              <Navigation />
            </Suspense>
            <main className="flex-1">
              <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading...</p>
                </div>
              </div>}>
                {children}
              </Suspense>
            </main>
            <Suspense fallback={<div className="h-64 bg-gray-900" />}>
              <Footer />
            </Suspense>
          </div>
          <PerformanceMonitor />
        </AuthProvider>
      </body>
    </html>
  );
}
