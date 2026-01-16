'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                </Link>

                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">About Ayash Tech</h1>
                    <p className="text-lg text-[var(--text-secondary)] mb-12">
                        We started this store because we got tired of ordering things online that looked nothing like the pictures.
                    </p>

                    {/* Values */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                            <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-4">
                                <Target className="w-5 h-5 text-[var(--accent)]" />
                            </div>
                            <h3 className="font-semibold text-[var(--text-primary)] mb-2">What We Do</h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                We test products before listing them. If it's on our site, someone on our team has actually used it.
                            </p>
                        </div>
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                            <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-4">
                                <Heart className="w-5 h-5 text-[var(--accent)]" />
                            </div>
                            <h3 className="font-semibold text-[var(--text-primary)] mb-2">No BS Policy</h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Real photos, honest descriptions, actual customer reviews. We don't hide anything.
                            </p>
                        </div>
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                            <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-5 h-5 text-[var(--accent)]" />
                            </div>
                            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Small Team</h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Just 4 people running this. When you contact support, you're talking to someone who actually works here.
                            </p>
                        </div>
                        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                            <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-4">
                                <Award className="w-5 h-5 text-[var(--accent)]" />
                            </div>
                            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Returns</h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Don't like it? Send it back. We'll refund you. Simple as that.
                            </p>
                        </div>
                    </div>

                    {/* Story */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8">
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">How We Started</h2>
                        <div className="space-y-4 text-[var(--text-secondary)]">
                            <p>
                                Back in early 2026, Ayash couldn't find a decent pair of wireless earbuds online.
                                Every product had 5-star reviews that looked fake, stock photos that didn't match what arrived,
                                and customer service that never responded.
                            </p>
                            <p>
                                So we built this. A store where we only sell things we've actually tested.
                                We take our own photos. We write honest descriptions — including the downsides.
                            </p>
                            <p>
                                We're based in Dhaka. Most orders ship same-day if you order before 2pm.
                                And yes, someone actually reads the support emails.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
