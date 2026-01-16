'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Package, LogOut, Menu, FileText, Users, BarChart3,
    ShoppingBag, TrendingUp, DollarSign, ShoppingCart, Eye
} from 'lucide-react';
import Cookies from 'js-cookie';

export default function AdminAnalyticsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = Cookies.get('admin_token');
        const role = Cookies.get('user_role');
        if (!token && role !== 'admin') {
            router.push('/admin/login');
        }
    }, [router]);

    const handleLogout = () => {
        Cookies.remove('admin_token');
        Cookies.remove('admin_email');
        Cookies.remove('user_role');
        router.push('/admin/login');
    };

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/products', icon: Package, label: 'Products' },
        { href: '/admin/requests', icon: FileText, label: 'Requests' },
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/analytics', icon: BarChart3, label: 'Analytics', active: true },
    ];

    // Mock analytics data
    const monthlyData = [
        { month: 'Jan', sales: 4200, orders: 42 },
        { month: 'Feb', sales: 5100, orders: 51 },
        { month: 'Mar', sales: 4800, orders: 48 },
        { month: 'Apr', sales: 6200, orders: 62 },
        { month: 'May', sales: 5800, orders: 58 },
        { month: 'Jun', sales: 7100, orders: 71 },
    ];

    const topProducts = [
        { name: 'Wireless Bluetooth Headphones', sales: 124, revenue: 18476 },
        { name: 'Smart Fitness Tracker', sales: 98, revenue: 7742 },
        { name: 'Minimalist Leather Watch', sales: 87, revenue: 17313 },
        { name: 'Organic Cotton T-Shirt', sales: 76, revenue: 2656 },
    ];

    const maxSales = Math.max(...monthlyData.map(d => d.sales));

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-800">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="font-semibold tracking-tight">Admin Panel</span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${item.active
                                    ? 'bg-neutral-800 text-white'
                                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-800">
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold">Analytics</h1>
                </header>

                <div className="p-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Revenue', value: '$33,200', change: '+12.5%', icon: DollarSign, color: 'text-emerald-400' },
                            { label: 'Total Orders', value: '332', change: '+8.2%', icon: ShoppingCart, color: 'text-blue-400' },
                            { label: 'Page Views', value: '12.4K', change: '+24.1%', icon: Eye, color: 'text-purple-400' },
                            { label: 'Conversion Rate', value: '2.68%', change: '+0.4%', icon: TrendingUp, color: 'text-amber-400' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    <span className="text-xs text-emerald-400">{stat.change}</span>
                                </div>
                                <p className="text-2xl font-semibold">{stat.value}</p>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Sales Chart */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                            <h3 className="font-semibold mb-6">Monthly Sales</h3>
                            <div className="flex items-end gap-3 h-48">
                                {monthlyData.map((data, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t"
                                            style={{ height: `${(data.sales / maxSales) * 100}%` }}
                                        />
                                        <span className="text-xs text-neutral-500">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Orders Chart */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                            <h3 className="font-semibold mb-6">Monthly Orders</h3>
                            <div className="flex items-end gap-3 h-48">
                                {monthlyData.map((data, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                                            style={{ height: `${(data.orders / Math.max(...monthlyData.map(d => d.orders))) * 100}%` }}
                                        />
                                        <span className="text-xs text-neutral-500">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                        <h3 className="font-semibold mb-4">Top Selling Products</h3>
                        <div className="space-y-4">
                            {topProducts.map((product, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-medium">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm">{product.name}</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm">
                                        <span className="text-neutral-400">{product.sales} sold</span>
                                        <span className="text-emerald-400 font-medium">${product.revenue.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
