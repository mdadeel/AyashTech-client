'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Heart, FileText, Settings } from 'lucide-react';
import { getCurrentUser } from '../../lib/auth';

export default function DashboardOverview() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const recentOrders = [
        { id: '1', product: 'Wireless Headphones', status: 'delivered', date: '2026-01-10', amount: 149.99 },
        { id: '2', product: 'Leather Watch', status: 'shipped', date: '2026-01-12', amount: 199.99 },
        { id: '3', product: 'Fitness Tracker', status: 'processing', date: '2026-01-13', amount: 79.99 },
    ];

    const statusColors = {
        delivered: 'text-emerald-500',
        shipped: 'text-blue-500',
        processing: 'text-amber-500'
    };

    if (!user) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Stats & Orders */}
            <div className="lg:col-span-2 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
                        <Package className="w-8 h-8 text-[var(--primary)] mx-auto mb-2" />
                        <p className="text-2xl font-bold text-[var(--text-primary)]">3</p>
                        <p className="text-xs text-[var(--text-muted)]">Orders</p>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
                        <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-[var(--text-primary)]">5</p>
                        <p className="text-xs text-[var(--text-muted)]">Wishlist</p>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
                        <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-[var(--text-primary)]">2</p>
                        <p className="text-xs text-[var(--text-muted)]">Requests</p>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                        <h3 className="font-semibold text-[var(--text-primary)]">Recent Orders</h3>
                        <Link href="/dashboard/orders" className="text-sm text-[var(--accent)] hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-[var(--border)]">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between px-5 py-4">
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">{order.product}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{order.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-sm capitalize ${statusColors[order.status]}`}>
                                        {order.status}
                                    </span>
                                    <span className="text-sm font-medium text-[var(--text-primary)]">${order.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Profile Card & Quick Actions */}
            <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-xl font-bold text-white">
                            {user.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">{user.name}</h3>
                            <p className="text-sm text-[var(--text-muted)]">{user.email}</p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-[var(--border)]">
                        <Link
                            href="/dashboard/profile"
                            className="block w-full py-2.5 text-center text-sm font-medium text-[var(--primary)] border border-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                        <Link
                            href="/dashboard/requests"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">Request a Product</span>
                        </Link>
                        <Link
                            href="/items"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <Package className="w-4 h-4 text-[var(--primary)]" />
                            <span className="text-sm">Browse Products</span>
                        </Link>
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <Settings className="w-4 h-4 text-neutral-400" />
                            <span className="text-sm">Account Settings</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
