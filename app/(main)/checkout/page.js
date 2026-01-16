'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, ShieldCheck, ArrowLeft, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart, cartCount } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call for payment
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
        setSuccess(true);
        clearCart();
        toast.success('Payment successful!');
    };

    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-[var(--background)] flex items-center justify-center">
                <div className="text-center px-6 max-w-lg">
                    <div className="w-20 h-20 bg-[var(--success)]/10 text-[var(--success)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Payment Successful!</h2>
                    <p className="text-[var(--text-secondary)] mb-8">
                        Thank you for your purchase. Your order has been placed successfully and will be shipped soon. An email confirmation has been sent to <strong>{formData.email}</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/items" className="btn-primary flex items-center justify-center gap-2">
                            <span>Continue Shopping</span>
                        </Link>
                        <Link href="/dashboard" className="px-6 py-3 border border-[var(--border)] rounded-md text-[var(--text-primary)] hover:bg-[var(--background-secondary)] transition-colors text-center font-medium">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (cartCount === 0) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-[var(--background)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                    <Link href="/items" className="btn-primary">Browse Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Cart</span>
                </Link>

                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Shipping Information */}
                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--primary)] text-white text-xs">1</span>
                                    <span>Shipping Details</span>
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">Street Address</label>
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                            placeholder="123 Street Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">City</label>
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">ZIP Code</label>
                                        <input
                                            required
                                            type="text"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                            placeholder="10001"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--primary)] text-white text-xs">2</span>
                                    <span>Payment Info</span>
                                </h3>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">Card Number</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">Expiry</label>
                                            <input
                                                required
                                                type="text"
                                                name="expiry"
                                                value={formData.expiry}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5 font-medium">CVV</label>
                                            <input
                                                required
                                                type="password"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                                                placeholder="***"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-start gap-3 p-4 bg-[var(--background-secondary)] rounded-lg">
                                    <Lock className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        Your payment information is processed securely. We do not store your credit card details on our servers.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg font-bold disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Processing Payment...</span>
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>Complete Purchase • ${cartTotal.toFixed(2)}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 sticky top-24">
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Your Order</h2>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-[var(--background-secondary)] rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.name}</h4>
                                            <p className="text-xs text-[var(--text-secondary)]">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[var(--border)] pt-6 space-y-3">
                                <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                                    <span>Shipping</span>
                                    <span className="text-[var(--success)]">Free</span>
                                </div>
                                <div className="border-t border-[var(--border)] pt-3 mt-3 flex justify-between items-center text-lg font-bold text-[var(--text-primary)]">
                                    <span>Order Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
