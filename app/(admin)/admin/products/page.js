'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Package, Plus, LogOut, Menu, FileText, Users, BarChart3,
    ShoppingBag, Edit, Trash2, Search, MoreHorizontal, Check, X, Eye
} from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { getItems, deleteItem } from '../../../lib/api';

export default function AdminProductsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const token = Cookies.get('admin_token');
        const role = Cookies.get('user_role');
        if (!token && role !== 'admin') {
            router.push('/admin/login');
            return;
        }
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

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const result = await deleteItem(id);
            if (result.success) {
                toast.success('Product deleted');
                fetchItems();
            } else {
                toast.error('Failed to delete');
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) return;
        if (confirm(`Delete ${selectedItems.length} products?`)) {
            for (const id of selectedItems) {
                await deleteItem(id);
            }
            toast.success(`Deleted ${selectedItems.length} products`);
            setSelectedItems([]);
            fetchItems();
        }
    };

    const toggleSelect = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(i => i.id));
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleLogout = () => {
        Cookies.remove('admin_token');
        Cookies.remove('admin_email');
        Cookies.remove('user_role');
        router.push('/admin/login');
    };

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/products', icon: Package, label: 'Products', active: true },
        { href: '/admin/requests', icon: FileText, label: 'Requests' },
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
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
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                    >
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
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-800">
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-semibold">Products</h1>
                    </div>
                    <Link href="/admin/add-item" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Add Product</span>
                    </Link>
                </header>

                <div className="p-6">
                    {/* Search & Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full px-4 py-2.5 pl-10 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
                            />
                        </div>
                        {selectedItems.length > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete ({selectedItems.length})</span>
                            </button>
                        )}
                    </div>

                    {/* Products Table */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-neutral-800/50">
                                    <tr>
                                        <th className="w-12 px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.length === items.length && items.length > 0}
                                                onChange={toggleSelectAll}
                                                className="rounded border-neutral-600"
                                            />
                                        </th>
                                        <th className="text-left px-6 py-3 font-medium text-neutral-400">Product</th>
                                        <th className="text-left px-6 py-3 font-medium text-neutral-400">Category</th>
                                        <th className="text-left px-6 py-3 font-medium text-neutral-400">Price</th>
                                        <th className="text-left px-6 py-3 font-medium text-neutral-400">Status</th>
                                        <th className="text-right px-6 py-3 font-medium text-neutral-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-800">
                                    {loading ? (
                                        <tr><td colSpan={6} className="px-6 py-8 text-center text-neutral-500">Loading...</td></tr>
                                    ) : filteredItems.length === 0 ? (
                                        <tr><td colSpan={6} className="px-6 py-8 text-center text-neutral-500">No products found</td></tr>
                                    ) : (
                                        filteredItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors">
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => toggleSelect(item.id)}
                                                        className="rounded border-neutral-600"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-800" />
                                                        <span className="font-medium">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-neutral-400 capitalize">{item.category}</td>
                                                <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400">Active</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/items/${item.id}`} className="p-2 rounded-lg hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link href={`/admin/products/edit/${item.id}`} className="p-2 rounded-lg hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
