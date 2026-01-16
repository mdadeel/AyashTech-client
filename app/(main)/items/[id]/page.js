'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { getItem } from '../../../lib/api';
import { useCart } from '../../../lib/CartContext';

export default function ItemDetailPage({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchItem();
    }, [id]);

    const fetchItem = async () => {
        setLoading(true);
        const result = await getItem(id);

        if (result.success && result.data) {
            setItem(result.data);
        } else {
            toast.error('Item not found');
        }
        setLoading(false);
    };

    const handleAddToCart = () => {
        addToCart(item, quantity);
    };

    const handleShare = async () => {
        try {
            await navigator.share({ title: item.name, url: window.location.href });
        } catch {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
                        <div className="aspect-square bg-[var(--background-secondary)] rounded-lg" />
                        <div className="space-y-6 py-8">
                            <div className="h-4 bg-[var(--background-secondary)] rounded w-1/4" />
                            <div className="h-8 bg-[var(--background-secondary)] rounded w-3/4" />
                            <div className="h-6 bg-[var(--background-secondary)] rounded w-1/4" />
                            <div className="h-20 bg-[var(--background-secondary)] rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-[var(--background)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Not Found</h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-6">This product doesn't exist.</p>
                    <Link href="/items" className="btn-primary">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-square rounded-lg overflow-hidden bg-[var(--background-secondary)]">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-medium bg-[var(--card)] text-[var(--text-secondary)] rounded-md border border-[var(--border)]">
                            {item.category}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="py-4">
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                            <span className="text-sm text-[var(--text-secondary)]">{item.rating || '4.5'} rating</span>
                        </div>

                        {/* Name */}
                        <h1 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] tracking-tight mb-4">
                            {item.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-2xl font-semibold text-[var(--text-primary)]">
                                ${item.price?.toFixed(2)}
                            </span>
                            <span className={`text-sm ${item.stock > 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                                {item.stock > 0 ? 'In stock' : 'Sold out'}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                            {item.description}
                        </p>

                        {/* Features */}
                        {item.features && item.features.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">Features</h3>
                                <ul className="space-y-2">
                                    {item.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                                            <Check className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <div className="flex items-center border border-[var(--border)] rounded-md">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--background-secondary)] transition-colors"
                                >
                                    −
                                </button>
                                <span className="px-4 py-3 font-medium min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(item.stock, quantity + 1))}
                                    className="px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--background-secondary)] transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={item.stock === 0}
                                className="flex-1 btn-primary flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add to Cart</span>
                            </button>

                            <button
                                onClick={() => toast.success('Added to wishlist')}
                                className="p-3 border border-[var(--border)] rounded-md hover:bg-[var(--background-secondary)] transition-colors"
                                aria-label="Add to wishlist"
                            >
                                <Heart className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleShare}
                                className="p-3 border border-[var(--border)] rounded-md hover:bg-[var(--background-secondary)] transition-colors"
                                aria-label="Share"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Trust */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--border)]">
                            {[
                                { icon: Truck, label: 'Free Shipping' },
                                { icon: Shield, label: '2 Year Warranty' },
                                { icon: RefreshCw, label: 'Easy Returns' }
                            ].map(({ icon: Icon, label }, i) => (
                                <div key={i} className="text-center">
                                    <Icon className="w-5 h-5 mx-auto mb-2 text-[var(--text-muted)]" />
                                    <p className="text-xs text-[var(--text-muted)]">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
