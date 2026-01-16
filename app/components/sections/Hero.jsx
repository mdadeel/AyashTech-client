import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] md:min-h-0 bg-[var(--background)] md:pt-28 md:pb-20 overflow-hidden flex items-center">
            {/* Mobile Background Image */}
            <div className="absolute inset-0 md:hidden">
                <img
                    src="/images/hero_product.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover grayscale-[30%] opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-[var(--background)]/60" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div className="animate-slide-up py-12 md:py-0">
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold mb-4 md:mb-6">
                            Since 2025
                        </p>

                        <h1 className="text-4xl md:text-6xl lg:heading-xl font-bold text-[var(--text-primary)] mb-6 leading-[1.1]">
                            We're picky about
                            <span className="block text-[var(--accent)]">what we sell</span>
                        </h1>

                        <p className="text-base md:text-lg text-[var(--text-secondary)] mb-8 md:mb-10 max-w-lg leading-relaxed">
                            If we wouldn't buy it ourselves, it's not here.
                            Electronics, accessories, home goods — all vetted, all quality.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12">
                            <Link
                                href="/items"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[var(--primary)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--primary-hover)] transition-all active:scale-95 shadow-lg shadow-[var(--primary)]/20"
                            >
                                <span>Browse Products</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-[var(--text-primary)] border border-[var(--border)] bg-[var(--background)]/50 backdrop-blur-md md:bg-transparent rounded-xl hover:bg-[var(--background-secondary)] transition-all active:scale-95"
                            >
                                Create Account
                            </Link>
                        </div>

                        {/* Minor Stats */}
                        <div className="pt-8 border-t border-[var(--border)] inline-flex gap-8">
                            <div>
                                <p className="text-xl font-semibold text-[var(--text-primary)]">483</p>
                                <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wider">Products</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-[var(--text-primary)]">12K+</p>
                                <p className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wider">Orders</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image (Desktop only) */}
                    <div className="hidden lg:block relative animate-fade-in group">
                        <div className="aspect-[16/10] rounded-lg overflow-hidden border border-[var(--border)] shadow-sm">
                            <img
                                src="/images/hero_product.png"
                                alt="Premium Curated Products"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        {/* Subtle floating badge */}
                        <div className="absolute -bottom-6 -left-6 bg-[var(--card)] border border-[var(--border)] p-5 rounded-lg shadow-lg animate-slide-up">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center">
                                    <span className="text-[var(--accent)] font-bold text-sm">★</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">Quality Assured</p>
                                    <p className="text-xs text-[var(--text-secondary)]">Hand-picked selection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
