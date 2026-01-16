'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, ChevronDown, LayoutDashboard, ShoppingCart } from 'lucide-react';
import Cookies from 'js-cookie';
import Logo from './Logo';
import { useScroll } from '../hooks/useScroll';
import { useClickOutside } from '../hooks/useClickOutside';
import { useCart } from '../lib/CartContext';

const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Clothing', slug: 'clothing' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // UI state for dropdowns
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { cartCount } = useCart();

    // Refs for click-outside detection
    const dropdownRef = useRef(null);
    const userMenuRef = useRef(null);

    // Custom hook for performance-optimized scroll detection
    const scrolled = useScroll(10);

    // Close dropdowns when clicking outside to improve UX
    useClickOutside(dropdownRef, () => setCategoriesOpen(false));
    useClickOutside(userMenuRef, () => setUserMenuOpen(false));

    // Check auth status on mount
    useEffect(() => {
        const authToken = Cookies.get('auth_token');
        setIsLoggedIn(!!authToken);
    }, []);

    const handleLogout = () => {
        // Clear all related cookies to ensure clean state
        ['auth_token', 'user_email', 'user_role', 'user_id', 'user_name'].forEach(cookie =>
            Cookies.remove(cookie)
        );

        setIsLoggedIn(false);
        setUserMenuOpen(false);
        window.location.href = '/';
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
            ? 'bg-[var(--background)]/80 backdrop-blur-md border-[var(--border)] shadow-sm py-2'
            : 'bg-transparent border-transparent py-4'
            }`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-14">
                    <Link href="/" className="hover:opacity-90 transition-opacity">
                        <Logo />
                    </Link>

                    {/* Primary Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/items"
                            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            Products
                        </Link>

                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setCategoriesOpen(!categoriesOpen)}
                                className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                <span>Categories</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {categoriesOpen && (
                                <ul className="absolute top-full left-0 mt-2 w-40 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg py-1 animate-fade-in">
                                    {categories.map((cat) => (
                                        <li key={cat.slug}>
                                            <Link
                                                href={`/items?category=${cat.slug}`}
                                                className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)] transition-colors"
                                                onClick={() => setCategoriesOpen(false)}
                                            >
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* User Actions & Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[var(--background-secondary)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isLoggedIn ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--background-secondary)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg py-1 animate-fade-in">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)] transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--error)] hover:bg-[var(--error)]/10 transition-colors text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white text-sm font-medium rounded-md hover:bg-[var(--primary-hover)] transition-colors"
                            >
                                <User className="w-4 h-4" />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-[var(--background-secondary)] transition-colors"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-[var(--border)] animate-fade-in">
                        <div className="flex flex-col gap-1">
                            <Link
                                href="/"
                                className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)] rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/items"
                                className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)] rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Products
                            </Link>

                            <div className="px-3 py-2">
                                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Categories</p>
                                <ul className="space-y-1">
                                    {categories.map((cat) => (
                                        <li key={cat.slug}>
                                            <Link
                                                href={`/items?category=${cat.slug}`}
                                                className="block py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-3 mt-3 border-t border-[var(--border)]">
                                {isLoggedIn ? (
                                    <>
                                        <Link
                                            href="/cart"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className="relative">
                                                <ShoppingCart className="w-4 h-4" />
                                                {cartCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-1 bg-[var(--primary)] text-white text-[8px] font-bold rounded-full">
                                                        {cartCount}
                                                    </span>
                                                )}
                                            </div>
                                            <span>Cart</span>
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--error)] rounded-md"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/cart"
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md mb-1"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className="relative">
                                                <ShoppingCart className="w-4 h-4" />
                                                {cartCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-1 bg-[var(--primary)] text-white text-[8px] font-bold rounded-full">
                                                        {cartCount}
                                                    </span>
                                                )}
                                            </div>
                                            <span>Cart</span>
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="block w-full px-3 py-2.5 bg-[var(--primary)] text-white text-sm font-medium text-center rounded-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
