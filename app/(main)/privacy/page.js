import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Privacy Policy</h1>
                    <p className="text-sm text-[var(--text-muted)] mb-8">Last updated: January 14, 2026 • Effective in Bangladesh</p>

                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">1. What We Collect</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                When you order: your name, phone number, email, and shipping address.
                                For payments: we use bKash/Nagad/card processors — we don't store your payment details ourselves.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">2. How We Use It</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                To ship your orders, send tracking updates via SMS/WhatsApp, and email you about sales
                                (only if you opt in). We don't sell your data to anyone.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">3. Information Sharing</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                We do not sell your personal information. We may share your information with service
                                providers who assist us in operating our business, such as payment processors and
                                shipping carriers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">4. Data Security</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                We implement appropriate security measures to protect your personal information against
                                unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">5. Your Rights</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                You have the right to access, update, or delete your personal information. You can
                                manage your account settings or contact us directly for assistance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">6. Contact Us</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{' '}
                                <a href="mailto:privacy@ayashtech.com" className="text-[var(--accent)] hover:underline">
                                    privacy@ayashtech.com
                                </a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
