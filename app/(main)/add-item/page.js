'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, AlertCircle, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { createItem } from '../../lib/api';

const categories = ['Electronics', 'Accessories', 'Clothing', 'Home', 'Fitness', 'Furniture'];

export default function AddItemPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
        features: ['']
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.description.trim()) newErrors.description = 'Required';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Required';
        if (!formData.category) newErrors.category = 'Required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.error('Please fill required fields');
            return;
        }

        setIsLoading(true);

        const itemData = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: parseFloat(formData.price),
            category: formData.category,
            stock: parseInt(formData.stock) || 0,
            image: formData.image || undefined,
            features: formData.features.filter(f => f.trim() !== '')
        };

        const result = await createItem(itemData);

        if (result.success) {
            toast.success('Product created');
            router.push('/items');
        } else {
            toast.error(result.error || 'Failed to create');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--background)]">
            <div className="container mx-auto px-6 max-w-xl">
                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-2">
                        Admin
                    </p>
                    <h1 className="heading-lg text-[var(--text-primary)]">
                        Add Product
                    </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Name <span className="text-[var(--error)]">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Product name"
                            className={`input ${errors.name ? 'border-[var(--error)]' : ''}`}
                        />
                        {errors.name && (
                            <p className="mt-1.5 text-xs text-[var(--error)] flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{errors.name}</span>
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Description <span className="text-[var(--error)]">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe the product..."
                            className={`input resize-none ${errors.description ? 'border-[var(--error)]' : ''}`}
                        />
                        {errors.description && (
                            <p className="mt-1.5 text-xs text-[var(--error)] flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{errors.description}</span>
                            </p>
                        )}
                    </div>

                    {/* Price & Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Price ($) <span className="text-[var(--error)]">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className={`input ${errors.price ? 'border-[var(--error)]' : ''}`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                className="input"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Category <span className="text-[var(--error)]">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`input ${errors.category ? 'border-[var(--error)]' : ''}`}
                        >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Image URL
                        </label>
                        <div className="relative">
                            <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="input input-with-icon-left"
                            />
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Features
                        </label>
                        <div className="space-y-2">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        placeholder={`Feature ${index + 1}`}
                                        className="input flex-1"
                                    />
                                    {formData.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="p-2.5 border border-[var(--border)] rounded-md hover:border-[var(--error)] hover:text-[var(--error)] transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addFeature}
                                className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add feature</span>
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Create Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
