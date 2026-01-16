'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Package, LogOut, Menu, FileText, Users, BarChart3,
    ShoppingBag, Shield, User, Ban, CheckCircle, Search
} from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// Mock users data
const MOCK_USER_LIST = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@store.com',
        role: 'admin',
        status: 'active',
        joinedAt: '2026-01-01',
        orders: 0
    },
    {
        id: '2',
        name: 'John Doe',
        email: 'user@store.com',
        role: 'user',
        status: 'active',
        joinedAt: '2026-01-05',
        orders: 5
    },
    {
        id: '3',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        status: 'active',
        joinedAt: '2026-01-08',
        orders: 3
    },
    {
        id: '4',
        name: 'Mike Wilson',
        email: 'mike@example.com',
        role: 'user',
        status: 'inactive',
        joinedAt: '2026-01-10',
        orders: 0
    }
];

export default function AdminUsersPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState(MOCK_USER_LIST);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const token = Cookies.get('admin_token');
        const role = Cookies.get('user_role');
        if (!token && role !== 'admin') {
            router.push('/admin/login');
        }
    }, [router]);

    const handleToggleRole = (id) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const newRole = u.role === 'admin' ? 'user' : 'admin';
                toast.success(`Changed ${u.name} to ${newRole}`);
                return { ...u, role: newRole };
            }
            return u;
        }));
    };

    const handleToggleStatus = (id) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const newStatus = u.status === 'active' ? 'inactive' : 'active';
                toast.success(`${u.name} is now ${newStatus}`);
                return { ...u, status: newStatus };
            }
            return u;
        }));
    };

    const handleLogout = () => {
        Cookies.remove('admin_token');
        Cookies.remove('admin_email');
        Cookies.remove('user_role');
        router.push('/admin/login');
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/products', icon: Package, label: 'Products' },
        { href: '/admin/requests', icon: FileText, label: 'Requests' },
        { href: '/admin/users', icon: Users, label: 'Users', active: true },
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
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-800">
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-semibold">User Management</h1>
                    </div>
                </header>

                <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                            <p className="text-2xl font-semibold">{users.length}</p>
                            <p className="text-sm text-neutral-500">Total Users</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                            <p className="text-2xl font-semibold text-purple-400">{users.filter(u => u.role === 'admin').length}</p>
                            <p className="text-sm text-neutral-500">Admins</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                            <p className="text-2xl font-semibold text-emerald-400">{users.filter(u => u.status === 'active').length}</p>
                            <p className="text-sm text-neutral-500">Active</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users..."
                            className="w-full px-4 py-2.5 pl-10 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
                        />
                    </div>

                    {/* Users Table */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-800/50">
                                <tr>
                                    <th className="text-left px-6 py-3 font-medium text-neutral-400">User</th>
                                    <th className="text-left px-6 py-3 font-medium text-neutral-400">Role</th>
                                    <th className="text-left px-6 py-3 font-medium text-neutral-400">Status</th>
                                    <th className="text-left px-6 py-3 font-medium text-neutral-400">Joined</th>
                                    <th className="text-left px-6 py-3 font-medium text-neutral-400">Orders</th>
                                    <th className="text-right px-6 py-3 font-medium text-neutral-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-neutral-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-xs text-neutral-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1.5 text-xs ${user.role === 'admin' ? 'text-purple-400' : 'text-neutral-400'}`}>
                                                {user.role === 'admin' ? <Shield className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active'
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'bg-neutral-500/10 text-neutral-400'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-400">{user.joinedAt}</td>
                                        <td className="px-6 py-4">{user.orders}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleRole(user.id)}
                                                    className="p-2 rounded-lg hover:bg-neutral-700 text-neutral-400 hover:text-purple-400 transition-colors"
                                                    title={user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                                                >
                                                    <Shield className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    className={`p-2 rounded-lg transition-colors ${user.status === 'active'
                                                        ? 'hover:bg-red-500/20 text-neutral-400 hover:text-red-400'
                                                        : 'hover:bg-emerald-500/20 text-neutral-400 hover:text-emerald-400'
                                                        }`}
                                                    title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
