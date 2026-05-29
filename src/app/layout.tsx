import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NextAuthSessionProvider } from "@/components/providers/session-provider";
import { ClientShell } from "@/components/layout/client-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduDiscover — College Discovery Platform",
  description: "Discover, compare, and save top-tier colleges and universities in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg focus:outline-hidden"
        >
          Skip to main content
        </a>
        <NextAuthSessionProvider>
          <Navbar />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 focus:outline-hidden"
          >
            {children}
          </main>
          <ClientShell />
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
