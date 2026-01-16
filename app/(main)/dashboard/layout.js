'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, User, Package, Heart, FileText, Settings } from 'lucide-react';
import { getCurrentUser } from '../../lib/auth';

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }
        setUser(currentUser);
        setLoading(false);
    }, [router]);

    const tabs = [
        { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { href: '/dashboard/profile', icon: User, label: 'Profile' },
        { href: '/dashboard/orders', icon: Package, label: 'Orders' },
        { href: '/dashboard/wishlist', icon: Heart, label: 'Wishlist' },
        { href: '/dashboard/requests', icon: FileText, label: 'Requests' },
        { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--background)] pt-20 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Header / Intro - simpler on mobile */}
            <div className="pt-12 px-6 pb-6 md:pt-24">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Account</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your orders and preferences</p>
                </div>
            </div>

            <div className="container mx-auto px-6">
                {/* Horizontal Tabs - Sticky on Mobile */}
                <div className="sticky top-0 z-30 bg-[var(--background)]/90 backdrop-blur-md -mx-6 px-6 mb-8 overflow-x-auto no-scrollbar border-b border-[var(--border)]">
                    <div className="flex gap-1 py-2">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all active:scale-95 ${isActive
                                        ? 'bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="pb-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
