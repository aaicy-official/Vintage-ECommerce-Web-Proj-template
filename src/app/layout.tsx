import type { Metadata } from "next";
import type React from "react";
import { Poppins, Volkhov } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const volkhov = Volkhov({
  variable: "--font-volkhov",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "FASCO - Online Shopping Store | Exclusive Fashion Deals",
  description: "Discover the latest fashion trends, seasonal collections, exclusive deals and new arrivals at FASCO eCommerce Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${volkhov.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-[#484848] bg-white">
        {children}
      </body>
    </html>
  );
}
