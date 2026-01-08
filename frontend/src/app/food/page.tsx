'use client';

import { useState, useEffect } from 'react';
import PersonalizedFood from '@/components/PersonalizedFood';
import BeverageRecommendations from '@/components/BeverageRecommendations';
import { usePersonalization } from '@/hooks/usePersonalization';
import { useCycleDetection } from '@/hooks/useCycleDetection';
import { getPhaseInfo, CyclePhase } from '@/lib/cycleUtils';
import { useTranslation } from '@/contexts/TranslationContext';
import { Loader2 } from 'lucide-react';

export default function FoodAndLifestyle() {
  const { t } = useTranslation();
  const { cycleInfo, loading: cycleLoading } = useCycleDetection();
  const [activePhase, setActivePhase] = useState<CyclePhase>('menstrual');
  const { profile, loading: profileLoading } = usePersonalization();

  // Auto-select phase based on cycle detection
  useEffect(() => {
    if (cycleInfo) {
      setActivePhase(cycleInfo.phase);
    }
  }, [cycleInfo]);

  const phaseInfo = {
    menstrual: getPhaseInfo('menstrual'),
    follicular: getPhaseInfo('follicular'),
    ovulation: getPhaseInfo('ovulation'),
    luteal: getPhaseInfo('luteal'),
  };

  const currentPhase = phaseInfo[activePhase];

  if (profileLoading || cycleLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#DB2777] mx-auto mb-4" />
          <p className="text-gray-600">{t('food.loadingRecommendations')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('food.title')}</h1>
              <p className="mt-1 text-sm text-gray-600">
                {t('food.personalizedFor')} {profile?.country || 'your location'} • {profile?.ageGroup || 'your age'}
                {cycleInfo && <span className="ml-2">• {t('food.cycleDay')} {cycleInfo.day}</span>}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentPhase.color}`}>
              {currentPhase.icon} {currentPhase.title}
            </div>
          </div>

          {/* Phase Selector */}
          <div className="mt-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {Object.entries(phaseInfo).map(([phase, data]) => {
              const isActive = activePhase === phase;
              const isCurrentPhase = cycleInfo?.phase === phase;
              return (
                <button
                  key={phase}
                  onClick={() => setActivePhase(phase as CyclePhase)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors relative ${isActive
                    ? 'bg-pink-100 text-pink-800 border border-pink-200 font-semibold'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {data.icon} {data.title.split(' ')[0]}
                  {isCurrentPhase && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content - AI-Powered */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* AI Notice */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🤖</span>
            <div>
              <h3 className="font-semibold text-gray-900">{t('food.aiPersonalizedContent')}</h3>
              <p className="text-sm text-gray-700 mt-1">
                {t('food.aiContentDesc')}
                <span className="font-medium"> {profile?.country}, {profile?.ageGroup}, {profile?.diet}</span>
                {cycleInfo && <span> • {t('food.currentlyIn')} {currentPhase.title}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* AI-Powered Food Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <PersonalizedFood phase={activePhase} />
        </div>

        {/* AI-Powered Beverages */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <BeverageRecommendations phase={activePhase} />
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {t('food.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}