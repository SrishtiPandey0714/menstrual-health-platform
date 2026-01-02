'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Lock, LogOut, Trash2 } from 'lucide-react';

type SettingsTab = 'profile' | 'preferences' | 'security' | 'notifications';

const SettingsSidebar = () => {
  const pathname = usePathname();
  const activeTab = pathname.split('/').pop() as SettingsTab || 'profile';

  const menuItems = [
    { id: '', label: 'Profile', icon: <User className="w-5 h-5" />, href: '/setting' },
    { id: 'preferences', label: 'Preferences', icon: <Lock className="w-5 h-5" />, href: '/setting/preferences' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 pt-16">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-pink-50 text-pink-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <button
            onClick={() => {
              // Handle logout
              console.log('Logout clicked');
            }}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
          
          <button
            onClick={() => {
              // Handle delete account
              console.log('Delete account clicked');
            }}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5 mr-3" />
            Delete Account
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SettingsSidebar;
