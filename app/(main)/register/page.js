'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validation
        if (!formData.name.trim()) {
            setError('Name is required');
            setIsLoading(false);
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For demo purposes, just show success and redirect
        toast.success('Account created successfully! Please sign in.');
        router.push('/login');
    };

    const passwordStrength = () => {
        const { password } = formData;
        if (!password) return null;
        if (password.length < 6) return { label: 'Weak', color: 'text-red-500', bg: 'bg-red-500' };
        if (password.length < 8) return { label: 'Fair', color: 'text-amber-500', bg: 'bg-amber-500' };
        return { label: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500' };
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-[var(--background)]">
            <div className="w-full max-w-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2 tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Join Ayash Tech today
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-3 p-3 rounded-md bg-red-50 dark:bg-red-950/20 text-[var(--error)] text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="input input-with-icon-left"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="input input-with-icon-left"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min. 8 characters"
                                className="input input-with-icon-left input-with-icon-right"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {strength && (
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex-1 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${strength.bg} transition-all`}
                                        style={{ width: formData.password.length < 6 ? '33%' : formData.password.length < 8 ? '66%' : '100%' }}
                                    />
                                </div>
                                <span className={`text-xs font-medium ${strength.color}`}>{strength.label}</span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter password"
                                className="input input-with-icon-left input-with-icon-right"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Passwords match</span>
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
                    <p className="text-sm text-[var(--text-secondary)]">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[var(--accent)] hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
