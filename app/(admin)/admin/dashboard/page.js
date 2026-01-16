'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Package, Plus, LogOut, Menu, X,
    ShoppingBag, TrendingUp, Users as UsersIcon, DollarSign, Edit, Trash2, FileText, BarChart3
} from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { getItems, deleteItem } from '../../../lib/api';

export default function AdminDashboard() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminEmail, setAdminEmail] = useState('');

    useEffect(() => {
        const token = Cookies.get('admin_token');
        const email = Cookies.get('admin_email');

        if (!token) {
            router.push('/admin/login');
            return;
        }

        setAdminEmail(email || 'Admin');
        fetchItems();
    }, [router]);

    const fetchItems = async () => {
        setLoading(true);
        const result = await getItems();
        if (result.success) {
            setItems(result.data || []);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        Cookies.remove('admin_token');
        Cookies.remove('admin_email');
        toast.success('Logged out successfully');
        router.push('/admin/login');
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const result = await deleteItem(id);
            if (result.success) {
                toast.success('Item deleted');
                fetchItems();
            } else {
                toast.error('Failed to delete item');
            }
        }
    };

    const stats = [
        { label: 'Total Products', value: items.length, icon: Package, color: 'bg-blue-500/10 text-blue-500' },
        { label: 'Total Revenue', value: `$${items.reduce((acc, item) => acc + item.price, 0).toFixed(0)}`, icon: DollarSign, color: 'bg-emerald-500/10 text-emerald-500' },
        { label: 'Categories', value: new Set(items.map(i => i.category)).size, icon: TrendingUp, color: 'bg-purple-500/10 text-purple-500' },
        { label: 'Avg. Rating', value: '4.8', icon: UsersIcon, color: 'bg-amber-500/10 text-amber-500' },
    ];

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
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neutral-800 text-white">
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-sm">Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                        <Package className="w-4 h-4" />
                        <span className="text-sm">Products</span>
                    </Link>
                    <Link href="/admin/requests" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Requests</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                        <UsersIcon className="w-4 h-4" />
                        <span className="text-sm">Users</span>
                    </Link>
                    <Link href="/admin/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                        <BarChart3 className="w-4 h-4" />
                        <span className="text-sm">Analytics</span>
                    </Link>
                    <Link href="/admin/add-item" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add Product</span>
                    </Link>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium">
                            {adminEmail.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{adminEmail}</p>
                            <p className="text-xs text-neutral-500">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-800">
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
                        View Store →
                    </Link>
                </header>

                <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <p className="text-2xl font-semibold">{stat.value}</p>
                                <p className="text-sm text-neutral-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Products Table */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                            <h2 className="font-semibold">All Products</h2>
                            <Link href="/admin/add-item" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>Add New</span>
                            </Link>
                        </div>

                        {loading ? (
                            <div className="p-8 text-center text-neutral-500">Loading products...</div>
                        ) : items.length === 0 ? (
                            <div className="p-8 text-center text-neutral-500">No products found</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-neutral-800/50">
                                        <tr>
                                            <th className="text-left px-6 py-3 font-medium text-neutral-400">Product</th>
                                            <th className="text-left px-6 py-3 font-medium text-neutral-400">Category</th>
                                            <th className="text-left px-6 py-3 font-medium text-neutral-400">Price</th>
                                            <th className="text-left px-6 py-3 font-medium text-neutral-400">Rating</th>
                                            <th className="text-right px-6 py-3 font-medium text-neutral-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-800">
                                        {items.map((item) => (
                                            <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-800" />
                                                        <span className="font-medium">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-neutral-400 capitalize">{item.category}</td>
                                                <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1">
                                                        <span className="text-amber-400">★</span> {item.rating}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/items/${item.id}`} className="p-2 rounded-lg hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
