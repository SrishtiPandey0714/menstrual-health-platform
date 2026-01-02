// Create a reusable BackButton component
// src/components/BackButton.tsx
'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton({ href = '/', label = 'Back to home' }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-pink-600 hover:text-pink-500 mb-4"
    >
      <FiArrowLeft className="h-4 w-4 mr-1" />
      <span>{label}</span>
    </Link>
  );
}