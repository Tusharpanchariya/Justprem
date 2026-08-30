import type { Metadata } from "next";
import { Inter, Tenor_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tenorSans = Tenor_Sans({
  variable: "--font-tenor",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JustPrem | A Journey Into Devotion",
  description: "Premium Harmoniums and Sacred Sound.",
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { CartProvider } from "@/lib/context/CartContext";
import { CartDrawer } from "@/components/commerce/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${tenorSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ivory text-charcoal">
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
