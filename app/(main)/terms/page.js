import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Terms of Service</h1>
                    <p className="text-sm text-[var(--text-muted)] mb-8">Last updated: January 14, 2026 • Dhaka, Bangladesh</p>

                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">1. Acceptance of Terms</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                By accessing and using Ayash Tech, you accept and agree to be bound by these Terms of
                                Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">2. Use of Service</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                You agree to use our service only for lawful purposes and in accordance with these
                                Terms. You are responsible for maintaining the confidentiality of your account
                                credentials.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">3. Products and Pricing</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                All products are subject to availability. Prices are subject to change without notice.
                                We reserve the right to limit quantities and to refuse or cancel any order.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">4. Payment</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                We accept bKash, Nagad, Rocket, and major debit/credit cards.
                                Cash on delivery available for orders under ৳5,000 in Dhaka.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">5. Shipping</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Dhaka: 1-2 days. Outside Dhaka: 3-5 days via Pathao/Steadfast.
                                Free shipping on orders over ৳2,000. We'll send tracking via SMS.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">6. Returns and Refunds</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                We accept returns within 30 days of delivery for most items in original condition.
                                Refunds will be processed to the original payment method within 5-10 business days.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">7. Limitation of Liability</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Ayash Tech shall not be liable for any indirect, incidental, special, or consequential
                                damages arising from your use of our services or products.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">8. Contact</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                For questions about these Terms, please contact us at{' '}
                                <a href="mailto:legal@ayashtech.com" className="text-[var(--accent)] hover:underline">
                                    legal@ayashtech.com
                                </a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
