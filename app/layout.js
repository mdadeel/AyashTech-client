import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Ayash Tech - Premium Quality Products',
  description: 'Your one-stop shop for premium electronics and accessories',
  keywords: "online store, electronics, accessories, home goods, shopping, premium products",
  icons: {
    icon: '/icon.svg',
  },
};

import { CartProvider } from "./lib/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16`} suppressHydrationWarning>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            },
          }}
        />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
