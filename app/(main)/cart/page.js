'use client';

import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../../lib/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    if (cartCount === 0) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-[var(--background)] flex items-center justify-center">
                <div className="text-center px-6">
                    <div className="w-20 h-20 bg-[var(--background-secondary)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-[var(--text-muted)]" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2"> Your cart is empty</h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                        Looks like you haven't added anything to your cart yet. Explore our premium collection and find something you love!
                    </p>
                    <Link href="/items" className="btn-primary inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row gap-6 p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl transition-all hover:border-[var(--accent)]"
                            >
                                {/* Item Image */}
                                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-[var(--background-secondary)] rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                                                <Link href={`/items/${item.id}`} className="hover:text-[var(--primary)] transition-colors">
                                                    {item.name}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-[var(--text-secondary)]">{item.category}</p>
                                        </div>
                                        <p className="text-lg font-bold text-[var(--text-primary)]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-6">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden h-10">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 hover:bg-[var(--background-secondary)] transition-colors text-[var(--text-secondary)]"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.min(item.stock || 99, item.quantity + 1))}
                                                className="px-3 hover:bg-[var(--background-secondary)] transition-colors text-[var(--text-secondary)]"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="flex items-center gap-2 text-sm text-[var(--error)] hover:opacity-80 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Link
                            href="/items"
                            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 sticky top-24">
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-[var(--text-secondary)]">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[var(--text-secondary)]">
                                    <span>Shipping</span>
                                    <span className="text-[var(--success)] font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-[var(--text-secondary)]">
                                    <span>Tax</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="border-t border-[var(--border)] pt-4 mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-[var(--text-primary)]">Total</span>
                                    <span className="text-2xl font-bold text-[var(--primary)]">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                                <span>Proceed to Checkout</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <div className="mt-6 flex items-center justify-center gap-4">
                                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
                                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6" />
                                <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
