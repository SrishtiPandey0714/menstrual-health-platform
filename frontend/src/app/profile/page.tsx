'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSettings, FiChevronRight, FiHelpCircle, FiUser, FiCalendar, FiMail, FiPhone } from 'react-icons/fi';
import { useTranslation } from '@/contexts/TranslationContext';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({
    name: 'Loading...',
    email: 'loading@example.com',
    phone: '',
    joinDate: 'Loading...',
    avatar: '/default-avatar.png'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real user data from backend
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');

        if (!token) {
          window.location.href = '/login';
          return;
        }

        // Get user email from stored user data
        const userData = storedUser ? JSON.parse(storedUser) : {};
        const userId = userData.id || userData.sub;

        // Fetch profile data
        const response = await fetch(`http://localhost:5000/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();

        // Format join date
        const joinDate = userData.createdAt
          ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : 'Recently';

        setUser({
          name: profileData.fullName || profileData.name || userData.email?.split('@')[0] || 'User',
          email: userData.email || 'No email',
          phone: profileData.phone || 'Not set',
          joinDate: joinDate,
          avatar: '/default-avatar.png'
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-500">{t('profile.memberSince')} {user.joinDate}</p>
                <Link
                  href="/setting"
                  className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <FiSettings className="mr-2 h-4 w-4" />
                  {t('profile.editProfile')}
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="border-t border-gray-200 px-6 py-5 sm:px-10">
            <dl className="space-y-6">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiUser className="mr-2 h-5 w-5 text-gray-400" />
                  {t('profile.fullName')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiMail className="mr-2 h-5 w-5 text-gray-400" />
                  {t('profile.email')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiPhone className="mr-2 h-5 w-5 text-gray-400" />
                  {t('profile.phone')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.phone}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiCalendar className="mr-2 h-5 w-5 text-gray-400" />
                  {t('profile.memberSince')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.joinDate}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <Link
              href="/setting"
              className="group flex items-center justify-between p-6 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <FiSettings className="h-5 w-5 text-pink-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{t('profile.settings')}</p>
                  <p className="text-sm text-gray-500">{t('profile.settingsDesc')}</p>
                </div>
              </div>
              <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            </Link>
            <Link
              href="/help"
              className="group flex items-center justify-between p-6 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiHelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{t('profile.helpSupport')}</p>
                  <p className="text-sm text-gray-500">{t('profile.helpSupportDesc')}</p>
                </div>
              </div>
              <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;