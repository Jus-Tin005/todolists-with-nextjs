import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// display: "swap" prevents mismatched font rendering during hydration.
// No dynamic values like Date.now() or browser APIs.

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display:"swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display:"swap",
});

export const metadata: Metadata = {
  title: "Next JS Todo CRUD",
  description: "A simple Todo CRUD app using PostgreSQL + Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* keep static, deterministic body */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
