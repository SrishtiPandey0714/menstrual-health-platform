// src/components/ui/Footer.tsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          <Link 
            href="/about" 
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
          <Link 
            href="/privacy" 
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Terms
          </Link>
          <Link 
            href="/signup/responsible-ai" 
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Responsible AI
          </Link>
          <Link 
            href="/help" 
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Help
          </Link>
          <Link 
            href="/contact" 
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
        </nav>
        <p className="mt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} CycleCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}