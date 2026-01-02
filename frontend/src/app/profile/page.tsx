'use client';

import Link from 'next/link';
import { FiSettings, FiChevronRight, FiHelpCircle, FiUser, FiCalendar, FiMail, FiPhone } from 'react-icons/fi';

const ProfilePage = () => {
  // Mock user data - replace with actual data from your auth provider
  const user = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
    avatar: '/default-avatar.png'
  };

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
                <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                <Link
                  href="/setting"
                  className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <FiSettings className="mr-2 h-4 w-4" />
                  Edit Profile
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
                  Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiMail className="mr-2 h-5 w-5 text-gray-400" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiPhone className="mr-2 h-5 w-5 text-gray-400" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.phone}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FiCalendar className="mr-2 h-5 w-5 text-gray-400" />
                  Member since
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
                  <p className="text-sm font-medium text-gray-900">Settings</p>
                  <p className="text-sm text-gray-500">Manage account preferences</p>
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
                  <p className="text-sm font-medium text-gray-900">Help & Support</p>
                  <p className="text-sm text-gray-500">Get help with the app</p>
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