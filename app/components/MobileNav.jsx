'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, User, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function MobileNav() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get('auth_token');
        setIsLoggedIn(!!authToken);
    }, [pathname]);

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/items', icon: ShoppingBag, label: 'Shop' },
        { href: '/search', icon: Search, label: 'Search' },
        {
            href: isLoggedIn ? '/dashboard' : '/login',
            icon: isLoggedIn ? LayoutDashboard : User,
            label: isLoggedIn ? 'Account' : 'Login'
        },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[var(--background)]/80 backdrop-blur-xl border-t border-[var(--border)] px-4 pb-safe">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 group transition-all duration-300 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-[var(--primary)]/10 scale-110' : 'group-active:scale-90'
                                }`}>
                                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                                {isActive && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse" />
                                )}
                            </div>
                            <span className="text-[10px] font-medium tracking-tight">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
