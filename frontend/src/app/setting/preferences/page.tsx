// src/app/setting/preferences/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

// Mock data - replace with actual data from your context/API
const initialPreferences = {
  ageGroup: '18-25',
  country: 'United States',
  language: 'English',
  gender: 'Female',
  diet: 'Vegetarian',
  dietaryRestrictions: 'Lactose intolerant',
  accessibility: 'Standard'
};

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // TODO: Replace with actual API call to save preferences
      console.log('Saving preferences:', preferences);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Show success message
      alert('Preferences saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-pink-600 hover:text-pink-700 mb-4"
          >
            <FiArrowLeft className="mr-2" /> Back to Settings
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Preferences</h1>
              <p className="text-sm text-gray-500 mt-1">
                {isEditing ? 'Edit your preferences' : 'View and manage your profile preferences'}
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700"
              >
                Edit Preferences
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="px-6 py-4">
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      disabled={isSaving}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {value || 'Not specified'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="px-6 py-4 bg-gray-50 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setPreferences(initialPreferences);
                    setIsEditing(false);
                  }}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  disabled={isSaving}
                >
                  <FiSave className={`mr-2 h-4 w-4 ${isSaving ? 'animate-spin' : ''}`} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}