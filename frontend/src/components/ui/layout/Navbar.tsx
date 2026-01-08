// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiHome, FiCalendar, FiMessageSquare, FiHeart, FiBookOpen, FiSettings, FiHelpCircle, FiLogIn } from 'react-icons/fi';
import { useTranslation } from '@/contexts/TranslationContext';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    // Check if user has JWT token
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  // Navigation items for logged-out users
  const publicNavItems = [
    { name: t('nav.home'), href: '/', icon: <FiHome className="h-5 w-5" /> },
    { name: t('nav.learn'), href: '/learn', icon: <FiBookOpen className="h-5 w-5" /> },
  ];

  // Navigation items for logged-in users
  const authenticatedNavItems = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: <FiCalendar className="h-5 w-5" /> },
    { name: t('nav.assistant'), href: '/assistant', icon: <FiMessageSquare className="h-5 w-5" /> },
    { name: t('nav.food'), href: '/food', icon: <FiHeart className="h-5 w-5" /> },
    { name: t('nav.learn'), href: '/learn', icon: <FiBookOpen className="h-5 w-5" /> },
  ];

  // Use conditional nav items
  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-pink-600">
                {t('brand.name')}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${pathname === item.href
                    ? 'border-pink-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {isAuthenticated ? (
              <Link
                href="/setting"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <FiSettings className="h-6 w-6" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  {t('auth.getStarted')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${pathname === item.href
                ? 'bg-pink-50 border-pink-500 text-pink-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } group flex items-center px-3 py-2 text-base font-medium border-l-4`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="ml-auto bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <span className="sr-only">{t('profile.title')}</span>
                  <FiSettings className="h-6 w-6" />
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                >
                  <FiLogIn className="h-4 w-4 mr-2" />
                  {t('nav.login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}