'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Cookies from 'js-cookie';

export default function CTA() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get('auth_token');
        setIsLoggedIn(!!authToken);
    }, []);

    // Don't show CTA if user is logged in
    if (isLoggedIn) return null;

    return (
        <section className="section bg-[var(--background)]">
            <div className="container mx-auto px-6">
                <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg p-12 md:p-16 text-center">
                    <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">
                        New Here?
                    </p>

                    <h2 className="heading-lg text-[var(--text-primary)] mb-4 max-w-lg mx-auto">
                        See what everyone's been ordering
                    </h2>

                    <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                        Create a free account to track orders and save your favorites.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/items"
                            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[var(--primary)] text-white text-sm font-medium rounded-md hover:bg-[var(--primary-hover)] transition-colors"
                        >
                            <span>Browse Products</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-md hover:bg-[var(--card)] transition-colors"
                        >
                            Sign Up Free
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
