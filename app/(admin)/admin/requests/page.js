'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Package, Plus, LogOut, Menu, FileText, Users, BarChart3,
    ShoppingBag, Check, X, Eye, MessageSquare, Clock, CheckCircle, XCircle
} from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// Mock product requests data
const MOCK_REQUESTS = [
    {
        id: '1',
        userId: '2',
        userName: 'John Doe',
        userEmail: 'user@store.com',
        productName: 'Smart Watch Pro',
        description: 'A premium smart watch with health monitoring features',
        category: 'electronics',
        expectedPrice: '$200-300',
        status: 'pending',
        notes: 'Would love to see heart rate monitoring',
        createdAt: '2026-01-10',
        adminFeedback: null
    },
    {
        id: '2',
        userId: '2',
        userName: 'John Doe',
        userEmail: 'user@store.com',
        productName: 'Ergonomic Office Chair',
        description: 'Comfortable chair for long work hours',
        category: 'furniture',
        expectedPrice: '$300-500',
        status: 'approved',
        notes: 'Need lumbar support',
        createdAt: '2026-01-08',
        adminFeedback: 'Great suggestion! Adding to our catalog soon.'
    },
    {
        id: '3',
        userId: '3',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        productName: 'Vintage Vinyl Player',
        description: 'Classic vinyl record player with modern features',
        category: 'electronics',
        expectedPrice: '$150-250',
        status: 'rejected',
        notes: '',
        createdAt: '2026-01-05',
        adminFeedback: 'Unfortunately, not in line with our current product strategy.'
    }
];

export default function AdminRequestsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [filter, setFilter] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const token = Cookies.get('admin_token');
        const role = Cookies.get('user_role');
        if (!token && role !== 'admin') {
            router.push('/admin/login');
        }
    }, [router]);

    const handleApprove = (id) => {
        setRequests(prev => prev.map(r =>
            r.id === id ? { ...r, status: 'approved', adminFeedback: feedback || 'Approved' } : r
        ));
        toast.success('Request approved');
        setSelectedRequest(null);
        setFeedback('');
    };

    const handleReject = (id) => {
        if (!feedback) {
            toast.error('Please provide feedback for rejection');
            return;
        }
        setRequests(prev => prev.map(r =>
            r.id === id ? { ...r, status: 'rejected', adminFeedback: feedback } : r
        ));
        toast.success('Request rejected');
        setSelectedRequest(null);
        setFeedback('');
    };

    const handleLogout = () => {
        Cookies.remove('admin_token');
        Cookies.remove('admin_email');
        Cookies.remove('user_role');
        router.push('/admin/login');
    };

    const filteredRequests = filter === 'all'
        ? requests
        : requests.filter(r => r.status === filter);

    const statusColors = {
        pending: 'bg-amber-500/10 text-amber-400',
        approved: 'bg-emerald-500/10 text-emerald-400',
        rejected: 'bg-red-500/10 text-red-400'
    };

    const statusIcons = {
        pending: Clock,
        approved: CheckCircle,
        rejected: XCircle
    };

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/products', icon: Package, label: 'Products' },
        { href: '/admin/requests', icon: FileText, label: 'Requests', active: true },
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
                        <h1 className="text-lg font-semibold">Product Requests</h1>
                    </div>
                    <div className="flex gap-2">
                        {['all', 'pending', 'approved', 'rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-colors ${filter === status
                                    ? 'bg-neutral-800 text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                            <p className="text-2xl font-semibold text-amber-400">{requests.filter(r => r.status === 'pending').length}</p>
                            <p className="text-sm text-neutral-500">Pending</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                            <p className="text-2xl font-semibold text-emerald-400">{requests.filter(r => r.status === 'approved').length}</p>
                            <p className="text-sm text-neutral-500">Approved</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                            <p className="text-2xl font-semibold text-red-400">{requests.filter(r => r.status === 'rejected').length}</p>
                            <p className="text-sm text-neutral-500">Rejected</p>
                        </div>
                    </div>

                    {/* Requests List */}
                    <div className="space-y-4">
                        {filteredRequests.map((request) => {
                            const StatusIcon = statusIcons[request.status];
                            return (
                                <div key={request.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-lg">{request.productName}</h3>
                                            <p className="text-sm text-neutral-400">by {request.userName} ({request.userEmail})</p>
                                        </div>
                                        <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${statusColors[request.status]}`}>
                                            <StatusIcon className="w-3.5 h-3.5" />
                                            {request.status}
                                        </span>
                                    </div>

                                    <p className="text-neutral-300 mb-3">{request.description}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-4">
                                        <span>Category: <span className="text-neutral-300 capitalize">{request.category}</span></span>
                                        <span>Price Range: <span className="text-neutral-300">{request.expectedPrice}</span></span>
                                        <span>Date: <span className="text-neutral-300">{request.createdAt}</span></span>
                                    </div>

                                    {request.notes && (
                                        <div className="bg-neutral-800/50 rounded-lg p-3 mb-4">
                                            <p className="text-sm text-neutral-400">User Notes: <span className="text-neutral-300">{request.notes}</span></p>
                                        </div>
                                    )}

                                    {request.adminFeedback && (
                                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 mb-4">
                                            <p className="text-sm text-emerald-400">Admin Feedback: <span className="text-neutral-300">{request.adminFeedback}</span></p>
                                        </div>
                                    )}

                                    {request.status === 'pending' && (
                                        <div className="flex gap-3 pt-3 border-t border-neutral-800">
                                            {selectedRequest === request.id ? (
                                                <div className="flex-1 space-y-3">
                                                    <textarea
                                                        value={feedback}
                                                        onChange={(e) => setFeedback(e.target.value)}
                                                        placeholder="Add feedback (required for rejection)..."
                                                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm resize-none"
                                                        rows={2}
                                                    />
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleApprove(request.id)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm transition-colors">
                                                            <Check className="w-4 h-4" /> Approve
                                                        </button>
                                                        <button onClick={() => handleReject(request.id)} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm transition-colors">
                                                            <X className="w-4 h-4" /> Reject
                                                        </button>
                                                        <button onClick={() => { setSelectedRequest(null); setFeedback(''); }} className="px-4 py-2 text-neutral-400 hover:text-white text-sm">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button onClick={() => setSelectedRequest(request.id)} className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors">
                                                    <MessageSquare className="w-4 h-4" /> Review Request
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
