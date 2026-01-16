'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RequestsPage() {
    const [showForm, setShowForm] = useState(false);
    const [requests, setRequests] = useState([
        { id: '1', productName: 'Smart Watch Pro', category: 'electronics', expectedPrice: '$200-300', status: 'pending', description: 'A premium smart watch with health monitoring', createdAt: '2026-01-10' },
        { id: '2', productName: 'Ergonomic Office Chair', category: 'furniture', expectedPrice: '$300-500', status: 'approved', description: 'Comfortable chair for long work hours', createdAt: '2026-01-08', feedback: 'Great suggestion! Adding to our catalog soon.' }
    ]);
    const [formData, setFormData] = useState({ productName: '', description: '', category: 'electronics', expectedPrice: '', notes: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = { id: Date.now().toString(), ...formData, status: 'pending', createdAt: new Date().toISOString().split('T')[0] };
        setRequests(prev => [newRequest, ...prev]);
        setFormData({ productName: '', description: '', category: 'electronics', expectedPrice: '', notes: '' });
        setShowForm(false);
        toast.success('Product request submitted!');
    };

    const handleDelete = (id) => { setRequests(prev => prev.filter(r => r.id !== id)); toast.success('Request deleted'); };

    const statusConfig = { pending: { icon: Clock, color: 'text-amber-500 bg-amber-400/10' }, approved: { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-400/10' }, rejected: { icon: XCircle, color: 'text-red-500 bg-red-400/10' } };
    const categories = ['electronics', 'accessories', 'clothing', 'home', 'fitness', 'furniture'];

    return (
        <>
            <div className="flex justify-end mb-6">
                <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /><span>New Request</span></button>
            </div>

            {showForm && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-4">Request a New Product</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Product Name</label><input type="text" value={formData.productName} onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))} className="input" required /></div>
                            <div><label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Category</label><select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="input capitalize">{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                        </div>
                        <div><label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Description</label><textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="input resize-none" rows={3} required /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Expected Price Range</label><input type="text" value={formData.expectedPrice} onChange={(e) => setFormData(prev => ({ ...prev, expectedPrice: e.target.value }))} placeholder="e.g. $50-100" className="input" /></div>
                            <div><label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Additional Notes</label><input type="text" value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} className="input" /></div>
                        </div>
                        <div className="flex gap-3 pt-2"><button type="submit" className="btn-primary">Submit Request</button><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Cancel</button></div>
                    </form>
                </div>
            )}

            {requests.length === 0 ? (
                <div className="text-center py-16">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-[var(--text-muted)]" />
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No product requests</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-6">Request products you'd like to see in our store</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => {
                        const StatusIcon = statusConfig[request.status].icon;
                        return (
                            <div key={request.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div><h3 className="font-semibold text-[var(--text-primary)]">{request.productName}</h3><p className="text-xs text-[var(--text-muted)]">Submitted on {request.createdAt}</p></div>
                                    <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full ${statusConfig[request.status].color}`}><StatusIcon className="w-3.5 h-3.5" />{request.status}</span>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-3">{request.description}</p>
                                <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
                                    <span>Category: <span className="text-[var(--text-secondary)] capitalize">{request.category}</span></span>
                                    {request.expectedPrice && <span>Price: <span className="text-[var(--text-secondary)]">{request.expectedPrice}</span></span>}
                                </div>
                                {request.feedback && (
                                    <div className="mt-3 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                                        <p className="text-xs text-emerald-500">Admin Feedback: <span className="text-[var(--text-secondary)]">{request.feedback}</span></p>
                                    </div>
                                )}
                                {request.status === 'pending' && (
                                    <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]">
                                        <button className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                                        <button onClick={() => handleDelete(request.id)} className="text-xs text-[var(--error)] flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
