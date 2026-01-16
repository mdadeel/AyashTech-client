'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, Grid, List } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ItemCard from '../../components/ItemCard';
import { getItems } from '../../lib/api';

const categories = ['All', 'Electronics', 'Accessories', 'Clothing', 'Home', 'Fitness', 'Furniture'];

function ItemsContent() {
    const searchParams = useSearchParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase());
        }
    }, [searchParams]);

    useEffect(() => {
        fetchItems();
    }, [selectedCategory, search]);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        const filters = {};
        if (selectedCategory !== 'All') filters.category = selectedCategory;
        if (search) filters.search = search;

        const result = await getItems(filters);

        // Handle API errors properly instead of silently showing empty list
        if (!result.success) {
            const errorMsg = result.error || 'Failed to load products';
            setError(errorMsg);
            toast.error(errorMsg);
            setItems([]);
        } else {
            setItems(result.data || []);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchItems();
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('All');
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-2">
                        Collection
                    </p>
                    <h1 className="heading-lg text-[var(--text-primary)]">
                        All Products
                    </h1>
                </div>

                {/* Search & View Toggle */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <form onSubmit={handleSearch} className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="input input-with-icon-left"
                            />
                        </div>
                    </form>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2.5 rounded-md border transition-colors ${viewMode === 'grid'
                                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                                : 'border-[var(--border)] hover:bg-[var(--background-secondary)]'
                                }`}
                            aria-label="Grid view"
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2.5 rounded-md border transition-colors ${viewMode === 'list'
                                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                                : 'border-[var(--border)] hover:bg-[var(--background-secondary)]'
                                }`}
                            aria-label="List view"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm rounded-md transition-colors ${selectedCategory === category
                                ? 'bg-[var(--primary)] text-white'
                                : 'bg-[var(--card)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}

                    {(search || selectedCategory !== 'All') && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm rounded-md text-[var(--error)] border border-[var(--error)]/20 hover:bg-[var(--error)]/5 transition-colors flex items-center gap-2"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span>Clear</span>
                        </button>
                    )}
                </div>

                {/* Results Count */}
                <p className="text-sm text-[var(--text-muted)] mb-6">
                    {items.length} product{items.length !== 1 ? 's' : ''}
                </p>

                {/* Items Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="card animate-pulse">
                                <div className="aspect-[4/3] bg-[var(--background-secondary)]" />
                                <div className="p-5 space-y-3">
                                    <div className="h-3 bg-[var(--background-secondary)] rounded w-1/3" />
                                    <div className="h-4 bg-[var(--background-secondary)] rounded w-2/3" />
                                    <div className="h-3 bg-[var(--background-secondary)] rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : items.length > 0 ? (
                    <div className={viewMode === 'grid'
                        ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                        : 'flex flex-col gap-4'
                    }>
                        {items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-lg text-[var(--text-primary)] mb-2">No products found</p>
                        <p className="text-sm text-[var(--text-secondary)] mb-6">
                            Try adjusting your search or filters
                        </p>
                        <button onClick={clearFilters} className="btn-primary">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ItemsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
                <div className="container mx-auto px-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-[var(--background-secondary)] rounded w-24" />
                        <div className="h-8 bg-[var(--background-secondary)] rounded w-48" />
                    </div>
                </div>
            </div>
        }>
            <ItemsContent />
        </Suspense>
    );
}
