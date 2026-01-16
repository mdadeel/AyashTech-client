'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Laptop, Watch, Shirt, Home as HomeIcon, Dumbbell, Sofa } from 'lucide-react';
import ItemCard from '../ItemCard';
import { getItems } from '../../lib/api';

const categories = [
    { name: 'Electronics', count: '87 items', slug: 'electronics', icon: Laptop },
    { name: 'Accessories', count: '42 items', slug: 'accessories', icon: Watch },
    { name: 'Clothing', count: '156 items', slug: 'clothing', icon: Shirt },
    { name: 'Home', count: '63 items', slug: 'home', icon: HomeIcon },
    { name: 'Fitness', count: '38 items', slug: 'fitness', icon: Dumbbell },
    { name: 'Furniture', count: '27 items', slug: 'furniture', icon: Sofa },
];

export default function Categories() {
    const [popularItems, setPopularItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPopular() {
            setLoading(true);
            try {
                const result = await getItems(); // Fetch all items
                if (result.success && Array.isArray(result.data)) {
                    // Just take the first 4 for "popular"
                    setPopularItems(result.data.slice(0, 4));
                } else {
                    console.error('Failed to load popular items:', result.error);
                }
            } catch (error) {
                console.error('Error fetching popular items:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPopular();
    }, []);

    return (
        <section className="section bg-[var(--background)]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-2">
                            Browse
                        </p>
                        <h2 className="heading-lg text-[var(--text-primary)]">
                            Shop by Category
                        </h2>
                    </div>
                    <Link
                        href="/items"
                        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <span>View all products</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Categories Grid - 3 columns on mobile (2 lines for 6 items) */}
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-20">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={index}
                                href={`/items?category=${category.slug}`}
                                className="group p-4 md:p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)] transition-all active:scale-95 text-center flex flex-col items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-[var(--background-secondary)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] md:text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                                        {category.name}
                                    </h3>
                                    <p className="hidden md:block text-[10px] text-[var(--text-muted)] mt-1">
                                        {category.count}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Popular Items Sub-section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="heading-md text-[var(--text-primary)]">Popular Items</h3>
                        <div className="h-px bg-[var(--border)] flex-1 mx-8 hidden sm:block"></div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="card animate-pulse">
                                    <div className="aspect-[4/3] bg-[var(--background-secondary)]" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-3 bg-[var(--background-secondary)] rounded w-1/3" />
                                        <div className="h-4 bg-[var(--background-secondary)] rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {popularItems.map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
