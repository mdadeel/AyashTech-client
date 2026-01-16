'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_WISHLIST = [
    { id: '1', name: 'Wireless Bluetooth Headphones', price: 149.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', category: 'electronics' },
    { id: '2', name: 'Minimalist Leather Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', category: 'accessories' },
    { id: '3', name: 'Premium Yoga Mat', price: 59.99, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200', category: 'fitness' },
    { id: '4', name: 'Organic Cotton T-Shirt', price: 34.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200', category: 'clothing' },
];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(MOCK_WISHLIST);

    const handleRemove = (id) => { setWishlist(prev => prev.filter(item => item.id !== id)); toast.success('Removed from wishlist'); };
    const handleAddToCart = (item) => { toast.success(`Added ${item.name} to cart`); };

    return (
        <>
            {wishlist.length === 0 ? (
                <div className="text-center py-16">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-[var(--text-muted)]" />
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Your wishlist is empty</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-6">Save items you like to your wishlist</p>
                    <Link href="/items" className="btn-primary">Browse Products</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {wishlist.map((item) => (
                        <div key={item.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden group">
                            <div className="aspect-[4/3] bg-[var(--background-secondary)] relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                <button onClick={() => handleRemove(item.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--error)] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-[var(--text-muted)] uppercase mb-1">{item.category}</p>
                                <h3 className="font-medium text-[var(--text-primary)] mb-2 line-clamp-1">{item.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-[var(--text-primary)]">${item.price}</span>
                                    <button onClick={() => handleAddToCart(item)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-white text-xs rounded-lg hover:bg-[var(--primary-hover)] transition-colors">
                                        <ShoppingCart className="w-3.5 h-3.5" /><span>Add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
