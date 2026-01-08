'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AIInsights from '@/components/AIInsights';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  MessageSquare,
  BookOpen,
  Utensils,
  Activity,
  ChevronRight,
  AlertTriangle,
  HeartPulse,
  Plus,
  Droplet,
  Calendar as CalendarIcon,
  Clock,
  Thermometer,
  AlertCircle,
  Phone
} from 'lucide-react';

type SavedEntry = {
  id: string;
  date: string;
  symptoms: string[];
  mood: string;
  flow: 'light' | 'medium' | 'heavy';
  notes?: string;
};



export default function DashboardPage() {
  const { t } = useTranslation();
  const [showEmergency, setShowEmergency] = useState(false);
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const emergencyContacts = [
    { id: 1, name: t('dashboard.emergencyServices'), number: '112', icon: <AlertTriangle className="h-5 w-5" /> },
    { id: 2, name: t('dashboard.womenHelpline'), number: '1091', icon: <Phone className="h-5 w-5" /> },
    { id: 3, name: t('dashboard.medicalHelp'), number: '108', icon: <HeartPulse className="h-5 w-5" /> },
  ];

  // Fetch cycle data from backend
  useEffect(() => {
    async function loadCycleData() {
      try {
        // Create mock token for development
        const mockToken = btoa(JSON.stringify({ header: { alg: 'none' } })) + '.' +
          btoa(JSON.stringify({ sub: 'user_123', name: 'Test User' })) +
          '.mock_signature';

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cycle`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${mockToken}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Cycle data from backend:', data);

          // Transform backend data to match our SavedEntry type
          if (data.logs && Array.isArray(data.logs)) {
            const transformedEntries = data.logs.map((log: any) => ({
              id: log._id || log.id,
              date: log.periodStart || log.date,
              symptoms: log.symptoms || [],
              mood: log.mood || 'Normal',
              flow: log.flowLevel || 'medium',
              notes: log.notes || '',
            }));
            setSavedEntries(transformedEntries);
          }
        }
      } catch (error) {
        console.error('Failed to load cycle data:', error);
        // Keep default mock data if API fails
      } finally {
        setLoading(false);
      }
    }

    loadCycleData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Help Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#DB2777] flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                {t('dashboard.emergencyTitle')}
              </h3>
              <button
                onClick={() => setShowEmergency(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {emergencyContacts.map((contact) => (
                <a
                  key={contact.id}
                  href={`tel:${contact.number}`}
                  className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    {contact.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{contact.name}</div>
                    <div className="text-red-600 font-semibold">{contact.number}</div>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-red-400" />
                </a>
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>{t('dashboard.emergencyNotice')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white py-8 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {t('dashboard.welcomeTitle')} <span className="text-[#DB2777]">{t('dashboard.title')}</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-base text-gray-600 sm:mt-3">
              {t('dashboard.welcomeSubtitle')}
            </p>
          </div>
          <button
            onClick={() => setShowEmergency(true)}
            className="absolute right-4 top-4 md:right-8 md:top-8 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            {t('dashboard.emergencyHelp')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('dashboard.quickActions')}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: t('dashboard.logPeriod'),
                description: t('dashboard.logPeriodDesc'),
                icon: <Activity className="h-6 w-6 text-[#DB2777]" />,
                href: '/tracker',
                bgColor: 'bg-[#FCE7F3]',
              },
              {
                name: t('dashboard.aiAssistant'),
                description: t('dashboard.aiAssistantDesc'),
                icon: <MessageSquare className="h-6 w-6 text-[#DB2777]" />,
                href: '/assistant',
                bgColor: 'bg-[#FCE7F3]',
              },
              {
                name: t('dashboard.foodLifestyle'),
                description: t('dashboard.foodLifestyleDesc'),
                icon: <Utensils className="h-6 w-6 text-[#DB2777]" />,
                href: '/food',
                bgColor: 'bg-[#FCE7F3]',
              },
              {
                name: t('dashboard.learnMore'),
                description: t('dashboard.learnMoreDesc'),
                icon: <BookOpen className="h-6 w-6 text-[#DB2777]" />,
                href: '/learn',
                bgColor: 'bg-[#FCE7F3]',
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${item.bgColor} rounded-xl p-6 hover:shadow-md transition-all duration-200 border border-transparent hover:border-[#DB2777]/30`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-white rounded-lg mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>

          {/* Cycle Tracker Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#DB2777] flex items-center">
                <Droplet className="h-5 w-5 mr-2" />
                {t('dashboard.yourCycle')}
              </h2>
              <Link href="/tracker" className="text-sm font-medium text-[#DB2777] hover:text-[#9D174D] flex items-center">
                {t('common.viewAll')} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{t('dashboard.cycleDay')} 5</h3>
                  <p className="text-sm text-gray-500">{t('dashboard.menstrualPhase')}</p>
                </div>
                <div className="bg-[#FCE7F3] text-[#DB2777] px-3 py-1 rounded-full text-sm font-medium">
                  {t('dashboard.lightFlow')}
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#DB2777] rounded-full" style={{ width: '25%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{t('dashboard.periodStarted')}</span>
                <span>5 {t('dashboard.daysLeft')}</span>
              </div>
            </div>
          </div>

          {/* Saved Entries Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#DB2777] flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                {t('dashboard.yourEntries')}
              </h2>
              <button className="text-sm font-medium text-[#DB2777] hover:text-[#9D174D] flex items-center">
                <Plus className="h-4 w-4 mr-1" /> {t('common.newEntry')}
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {savedEntries.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {savedEntries.map((entry) => (
                    <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="bg-[#FCE7F3] p-2 rounded-lg mr-4">
                          <CalendarIcon className="h-5 w-5 text-[#DB2777]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900">
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${entry.flow === 'light'
                              ? 'bg-blue-100 text-blue-800'
                              : entry.flow === 'medium'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-red-100 text-red-800'
                              }`}>
                              {entry.flow.charAt(0).toUpperCase() + entry.flow.slice(1)} Flow
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {entry.symptoms.map((symptom, i) => (
                              <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {symptom}
                              </span>
                            ))}
                          </div>
                          {entry.notes && (
                            <p className="mt-2 text-sm text-gray-600">{entry.notes}</p>
                          )}
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{t('dashboard.logged')} {new Date(entry.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <Thermometer className="h-3.5 w-3.5 mr-1" />
                              {t('dashboard.mood')}: {entry.mood}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">{t('dashboard.noEntriesYet')}</h3>
                  <p className="mt-1 text-sm text-gray-500">{t('dashboard.noEntriesDesc')}</p>
                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#DB2777] hover:bg-[#BE185D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      <Plus className="-ml-1 mr-2 h-5 w-5" />
                      {t('dashboard.addFirstEntry')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.recentActivities')}</h2>
              <Link href="/activities" className="text-sm font-medium text-[#DB2777] hover:text-[#9D174D] flex items-center">
                {t('common.viewAll')} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {[
                { id: 1, titleKey: 'periodStarted', time: '2 hours ago', icon: '🩸' },
                { id: 2, titleKey: 'moodEnergetic', time: '5 hours ago', icon: '😊' },
                { id: 3, titleKey: 'loggedSymptoms', time: '1 day ago', icon: '📝' },
                { id: 4, titleKey: 'cyclePredictionUpdated', time: '2 days ago', icon: '📊' },
              ].map((activity, index) => (
                <div key={activity.id} className={`p-4 flex items-center ${index !== 3 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FCE7F3] flex items-center justify-center text-lg mr-4">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{t(`dashboard.${activity.titleKey}`)}</h4>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}