import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zero Point Labs | Crafting Digital Futures",
  description: "Zero Point Labs is a modern web development agency specializing in cutting-edge digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Script 
          src="https://zero-point-labs-dasboard.vercel.app/analytics.js" 
          strategy="afterInteractive" 
        />
        <Script id="analytics-init" strategy="afterInteractive">
          {`Analytics.init('ak_7fbe6a02c8c572dea7174afafd9d1624f7bdf4129d9712e6b5f270143deefede');`}
        </Script>
      </body>
    </html>
  );
}
