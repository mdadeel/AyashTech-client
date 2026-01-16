import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
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
    title: 'Admin Dashboard - Ayash Tech',
    description: 'Admin dashboard for Ayash Tech',
};

export default function AdminLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#1a1a1a',
                            color: '#fff',
                            border: '1px solid #333',
                        },
                    }}
                />
                {children}
            </body>
        </html>
    );
}
