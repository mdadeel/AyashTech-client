'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { authenticate, MOCK_CREDENTIALS } from '../../lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        await new Promise(resolve => setTimeout(resolve, 500));

        const result = authenticate(formData.email, formData.password);

        if (result.success) {
            toast.success(`Welcome back, ${result.user.name}!`);
            // Redirect based on role
            if (result.user.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/dashboard');
            }
        } else {
            setError(result.error);
            toast.error(result.error);
        }

        setIsLoading(false);
    };

    const fillDemoCredentials = () => {
        setFormData({
            email: MOCK_CREDENTIALS.email,
            password: MOCK_CREDENTIALS.password
        });
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-[var(--background)]">
            <div className="w-full max-w-sm">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Sign in to your account
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
                                placeholder="Enter password"
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
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Demo */}
                <div className="mt-8 pt-8 border-t border-[var(--border)]">
                    <p className="text-xs text-center text-[var(--text-muted)] mb-3">
                        Try the demo
                    </p>
                    <div className="space-y-2">
                        <button
                            onClick={fillDemoCredentials}
                            className="w-full py-2.5 text-sm text-[var(--text-secondary)] border border-dashed border-[var(--border)] rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                        >
                            👤 demo@ayashtech.com
                        </button>
                        <button
                            onClick={() => { setFormData({ email: 'admin@ayashtech.com', password: 'admin2026!' }); setError(''); }}
                            className="w-full py-2.5 text-sm text-[var(--text-secondary)] border border-dashed border-[var(--border)] rounded-md hover:border-purple-500 hover:text-purple-500 transition-colors"
                        >
                            🛡️ admin@ayashtech.com
                        </button>
                    </div>
                    <p className="mt-3 text-xs text-center text-[var(--text-muted)]">
                        Passwords: demo1234 / admin2026!
                    </p>
                </div>
            </div>
        </div>
    );
}
