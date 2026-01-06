'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const SettingsSidebarContent = dynamic(
  () => import('../SettingsSidebar'),
  {
    loading: () => <Skeleton className="w-64 h-screen fixed left-0 top-0 pt-16" />,
    ssr: false
  }
);

export default function ClientSettingsSidebar() {
  return <SettingsSidebarContent />;
}
