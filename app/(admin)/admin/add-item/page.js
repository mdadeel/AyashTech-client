'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard, Plus, LogOut, ArrowLeft,
    ShoppingBag, Upload, X
} from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { createItem } from '../../../lib/api';

const categories = ['electronics', 'accessories', 'clothing', 'home', 'fitness', 'furniture'];

export default function AdminAddItem() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'electronics',
        image: '',
        rating: '4.5',
        features: ['']
    });

    useEffect(() => {
        const token = Cookies.get('admin_token');
        if (!token) {
            router.push('/admin/login');
        }
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures.length ? newFeatures : [''] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const itemData = {
            ...formData,
            price: parseFloat(formData.price),
            rating: parseFloat(formData.rating),
            features: formData.features.filter(f => f.trim())
        };

        const result = await createItem(itemData);

        if (result.success) {
            toast.success('Product created successfully!');
            router.push('/admin/dashboard');
        } else {
            toast.error(result.error || 'Failed to create product');
        }

        setIsLoading(false);
    };

    const handleLogout = () => {
        Cookies.remove('admin_token');
        Cookies.remove('admin_email');
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-neutral-900 border-r border-neutral-800 hidden lg:block">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-800">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="font-semibold tracking-tight">Admin Panel</span>
                </div>

                <nav className="p-4 space-y-1">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-sm">Dashboard</span>
                    </Link>
                    <Link href="/admin/add-item" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neutral-800 text-white">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add Product</span>
                    </Link>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex items-center gap-4">
                    <Link href="/admin/dashboard" className="p-2 rounded-lg hover:bg-neutral-800 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-semibold">Add New Product</h1>
                </header>

                <div className="p-6 max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                                required
                            />
                        </div>

                        {/* Price & Category */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="99.99"
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all capitalize"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="capitalize">{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Image URL</label>
                            <div className="relative">
                                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 pl-10 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Features</label>
                            <div className="space-y-2">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            placeholder={`Feature ${index + 1}`}
                                            className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="p-2.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                + Add another feature
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    <span>Create Product</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
