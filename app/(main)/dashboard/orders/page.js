'use client';

import { useState } from 'react';
import { Eye, Package } from 'lucide-react';
import Link from 'next/link';

const MOCK_ORDERS = [
    { id: 'ORD-001', date: '2026-01-13', status: 'processing', total: 229.98, items: [{ name: 'Wireless Headphones', qty: 1, price: 149.99 }, { name: 'Smart Fitness Tracker', qty: 1, price: 79.99 }] },
    { id: 'ORD-002', date: '2026-01-10', status: 'shipped', total: 199.99, items: [{ name: 'Minimalist Leather Watch', qty: 1, price: 199.99 }] },
    { id: 'ORD-003', date: '2026-01-05', status: 'delivered', total: 94.98, items: [{ name: 'Premium Yoga Mat', qty: 1, price: 59.99 }, { name: 'Organic Cotton T-Shirt', qty: 1, price: 34.99 }] }
];

export default function OrdersPage() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const statusColors = { processing: 'bg-amber-400/10 text-amber-500', shipped: 'bg-blue-400/10 text-blue-500', delivered: 'bg-emerald-400/10 text-emerald-500' };

    return (
        <div className="space-y-4">
            {MOCK_ORDERS.length === 0 ? (
                <div className="text-center py-16">
                    <Package className="w-12 h-12 mx-auto mb-4 text-[var(--text-muted)]" />
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No orders yet</h3>
                    <Link href="/items" className="btn-primary">Start Shopping</Link>
                </div>
            ) : (
                MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="font-semibold text-[var(--text-primary)]">{order.id}</p>
                                <p className="text-xs text-[var(--text-muted)]">Placed on {order.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 text-xs rounded-full capitalize ${statusColors[order.status]}`}>{order.status}</span>
                                <button onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)} className="p-2 rounded-lg hover:bg-[var(--background-secondary)] text-[var(--text-secondary)]">
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        {selectedOrder === order.id && (
                            <div className="border-t border-[var(--border)] pt-4 mb-4">
                                <p className="text-xs text-[var(--text-muted)] mb-2">Items</p>
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm py-1">
                                        <span className="text-[var(--text-secondary)]">{item.name} x{item.qty}</span>
                                        <span className="text-[var(--text-primary)]">${item.price}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                            <span className="text-sm text-[var(--text-muted)]">{order.items.length} item(s)</span>
                            <span className="font-semibold text-[var(--text-primary)]">Total: ${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
