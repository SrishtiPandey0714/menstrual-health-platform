'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/contexts/TranslationContext';
import SettingsSidebar from '@/components/SettingsSidebar';

type UserProfile = {
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  diet?: string;
  dietaryRestrictions?: string;
  allergies?: string[];
  dietaryPreferences?: string[];
  language?: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const { t, language, setLanguage } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Allow editing by default
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    diet: '',
    dietaryRestrictions: '',
    allergies: [],
    dietaryPreferences: []
  });

  const availableLanguages = [
    { code: 'en', name: t('languages.en') },
    { code: 'es', name: t('languages.es') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'hi', name: t('languages.hi') },
    { code: 'de', name: t('languages.de') },
    { code: 'pt', name: t('languages.pt') },
  ];

  // Fetch real user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');

        if (!token || !storedUser) {
          router.push('/login');
          return;
        }

        const userData = JSON.parse(storedUser);

        // Fetch profile from backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const profileData = data.profile || data; // Handle both nested and flat responses

          // Map database arrays to form strings
          const diet = profileData.dietaryPreferences && profileData.dietaryPreferences.length > 0
            ? profileData.dietaryPreferences[0]
            : '';
          const allergies = profileData.allergies && profileData.allergies.length > 0
            ? profileData.allergies.join(', ')
            : '';

          setProfile({
            name: profileData.fullName || profileData.name || userData.email?.split('@')[0] || '',
            email: userData.email || '',
            phone: profileData.phone || '',
            birthDate: profileData.birthDate || '',
            gender: profileData.gender || '',
            diet: diet,
            dietaryRestrictions: allergies,
            allergies: profileData.allergies || [],
            dietaryPreferences: profileData.dietaryPreferences || [],
            language: profileData.language || 'en'
          });
          // Also set selected language
          if (profileData.language) {
            setSelectedLanguage(profileData.language);
          }
        } else {
          // If profile fetch fails, use basic data from stored user
          setProfile({
            name: userData.email?.split('@')[0] || '',
            email: userData.email || '',
            phone: '',
            birthDate: '',
            gender: '',
            diet: '',
            dietaryRestrictions: '',
            allergies: [],
            dietaryPreferences: []
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, [router]);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get real auth token
      const token = localStorage.getItem('auth_token');

      if (!token) {
        alert('Please log in again');
        router.push('/login');
        return;
      }

      // Save to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          language: selectedLanguage,
          fullName: profile.name,
          phone: profile.phone,
          birthDate: profile.birthDate,
          gender: profile.gender,
          diet: profile.diet,
          dietaryRestrictions: profile.dietaryRestrictions,
        }),
      });

      if (response.ok) {
        // Update global language context if changed
        if (selectedLanguage !== language) {
          setLanguage(selectedLanguage);
        }
        alert(t('profile.saveSuccess') || 'Profile updated successfully!');
        setIsEditing(false);
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert(t('profile.saveError') || 'Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(t('profile.updateSuccess'));
    }, 1500);
  };

  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      alert(t('settings.deleteAccountConfirm'));
      router.push('/');
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SettingsSidebar />

      <main className="flex-1 ml-64 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
                <p className="text-sm text-gray-500">{t('settings.subtitle')}</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  {t('settings.editProfile')}
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('settings.fullName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('settings.emailAddress')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('settings.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder={t('settings.phonePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                    {t('settings.dateOfBirth')}
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={profile.birthDate}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    {t('settings.gender')}
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={profile.gender}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">{t('settings.selectGender')}</option>
                    <option value="female">{t('settings.female')}</option>
                    <option value="male">{t('settings.male')}</option>
                    <option value="other">{t('settings.other')}</option>
                    <option value="prefer_not_to_say">{t('settings.preferNotToSay')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="diet" className="block text-sm font-medium text-gray-700">
                    {t('settings.dietPreference')}
                  </label>
                  <select
                    id="diet"
                    name="diet"
                    value={profile.diet}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">{t('settings.selectDiet')}</option>
                    <option value="Non-vegetarian">Non-vegetarian</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Pescatarian">Pescatarian</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
                    {t('settings.allergies')}
                  </label>
                  <input
                    type="text"
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={profile.dietaryRestrictions}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder={t('settings.allergiesPlaceholder')}
                  />
                  <p className="mt-1 text-xs text-gray-500">{t('settings.allergiesHelp')}</p>
                </div>

                {/* Language Preference */}
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    {t('settings.languagePreference')}
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    {availableLanguages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">{t('settings.selectLanguage')}</p>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                    >
                      {isLoading ? t('common.saving') : t('common.saveChanges')}
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Danger Zone */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-medium text-red-700">{t('settings.dangerZone')}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {t('settings.dangerZoneDesc')}
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-red-800">{t('settings.deleteAccount')}</h3>
                    <p className="text-sm text-red-600">
                      {showDeleteConfirm
                        ? t('settings.deleteAccountConfirm')
                        : t('settings.deleteAccountDesc')}
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${showDeleteConfirm ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50`}
                  >
                    {showDeleteConfirm ? t('settings.confirmDeletion') : t('settings.deleteAccount')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}