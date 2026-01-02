// src/app/food/page.tsx
'use client';

import { useState } from 'react';

type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
type TabType = 'food' | 'activities' | 'tips';

interface FoodRecommendation {
  title: string;
  icon: string;
  color: string;
  foods: { name: string; description: string; emoji: string }[];
  avoid: { name: string; reason: string }[];
  activities: { name: string; intensity: 'low' | 'medium' | 'high' }[];
  hydration: string;
  tips: string[];
}

const foodRecommendations: Record<CyclePhase, FoodRecommendation> = {
  menstrual: {
    title: 'Menstrual Phase',
    icon: '🩸',
    color: 'bg-pink-100 text-pink-800',
    foods: [
      { emoji: '🥬', name: 'Iron-rich', description: 'Spinach, lentils, tofu, dark chocolate' },
      { emoji: '🥑', name: 'Magnesium', description: 'Bananas, almonds, avocado, dark greens' },
      { emoji: '🍊', name: 'Vitamin C', description: 'Oranges, strawberries, bell peppers' },
    ],
    avoid: [
      { name: 'Caffeine', reason: 'Can worsen cramps' },
      { name: 'Salty foods', reason: 'Increases bloating' },
      { name: 'Processed foods', reason: 'May increase inflammation' },
    ],
    activities: [
      { name: 'Gentle yoga', intensity: 'low' },
      { name: 'Walking', intensity: 'low' },
      { name: 'Restorative stretching', intensity: 'low' },
    ],
    hydration: '💧 Warm herbal teas, water with lemon',
    tips: [
      'Prioritize iron-rich foods to replenish lost iron',
      'Stay hydrated to reduce bloating',
      'Get plenty of rest and listen to your body'
    ]
  },
  follicular: {
    title: 'Follicular Phase',
    icon: '🌱',
    color: 'bg-green-100 text-green-800',
    foods: [
      { emoji: '🥦', name: 'Veggies', description: 'Broccoli, cauliflower, Brussels sprouts' },
      { emoji: '🥑', name: 'Healthy fats', description: 'Avocados, nuts, seeds, olive oil' },
      { emoji: '🌾', name: 'Whole grains', description: 'Quinoa, brown rice, oats, whole wheat' },
    ],
    avoid: [
      { name: 'Processed foods', reason: 'Low nutritional value' },
      { name: 'Excess sugar', reason: 'Can cause energy crashes' },
      { name: 'Alcohol', reason: 'May disrupt hormone balance' },
    ],
    activities: [
      { name: 'Cardio', intensity: 'high' },
      { name: 'Strength training', intensity: 'high' },
      { name: 'Dancing', intensity: 'medium' },
    ],
    hydration: '💦 Lemon water, herbal teas, coconut water',
    tips: [
      'Great time for trying new recipes',
      'Focus on protein for muscle recovery',
      'Your energy is rising - take advantage!'
    ]
  },
  ovulation: {
    title: 'Ovulation',
    icon: '✨',
    color: 'bg-blue-100 text-blue-800',
    foods: [
      { emoji: '🫐', name: 'Antioxidants', description: 'Berries, dark chocolate, artichokes' },
      { emoji: '🐟', name: 'Omega-3', description: 'Fatty fish, flaxseeds, walnuts, chia' },
      { emoji: '🥕', name: 'Colorful veggies', description: 'Bell peppers, carrots, sweet potatoes' },
    ],
    avoid: [
      { name: 'Processed meats', reason: 'May cause inflammation' },
      { name: 'Excessive dairy', reason: 'Can increase mucus production' },
      { name: 'Refined carbs', reason: 'May cause energy crashes' },
    ],
    activities: [
      { name: 'HIIT', intensity: 'high' },
      { name: 'Swimming', intensity: 'medium' },
      { name: 'Running', intensity: 'high' },
    ],
    hydration: '💧 Water with cucumber, herbal teas, fresh juices',
    tips: [
      'Your energy is at its peak this week',
      'Stay hydrated to support egg release',
      'Great time for social activities'
    ]
  },
  luteal: {
    title: 'Luteal Phase',
    icon: '🌙',
    color: 'bg-purple-100 text-purple-800',
    foods: [
      { emoji: '🍠', name: 'Complex carbs', description: 'Sweet potatoes, whole grains, beans' },
      { emoji: '🍫', name: 'Magnesium', description: 'Dark chocolate, spinach, pumpkin seeds' },
      { emoji: '🥚', name: 'B-vitamins', description: 'Eggs, leafy greens, legumes, meat' },
    ],
    avoid: [
      { name: 'Caffeine', reason: 'Can increase anxiety' },
      { name: 'Salty snacks', reason: 'Worsens bloating' },
      { name: 'Sugary foods', reason: 'May worsen mood swings' },
    ],
    activities: [
      { name: 'Yoga', intensity: 'medium' },
      { name: 'Pilates', intensity: 'medium' },
      { name: 'Walking', intensity: 'low' },
    ],
    hydration: '💧 Herbal teas, water with lemon, warm water',
    tips: [
      'Focus on complex carbs for stable energy',
      'Practice stress-reducing activities',
      'Get enough sleep to support progesterone'
    ]
  }
};

const intensityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

export default function FoodAndLifestyle() {
  const [activePhase, setActivePhase] = useState<CyclePhase>('menstrual');
  const [activeTab, setActiveTab] = useState<TabType>('food');
  const currentPhase = foodRecommendations[activePhase];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cycle Nutrition Guide</h1>
              <p className="mt-1 text-sm text-gray-600">Personalized recommendations for each phase</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentPhase.color}`}>
              {currentPhase.icon} {currentPhase.title}
            </div>
          </div>

          {/* Phase Selector */}
          <div className="mt-6 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {Object.entries(foodRecommendations).map(([phase, data]) => {
              const isActive = activePhase === phase;
              return (
                <button
                  key={phase}
                  onClick={() => setActivePhase(phase as CyclePhase)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'bg-pink-100 text-pink-800 border border-pink-200 font-semibold'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {data.icon} {data.title.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'food', label: 'Food & Nutrition' },
              { id: 'activities', label: 'Activities' },
              { id: 'tips', label: 'Wellness Tips' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Food & Nutrition Tab */}
          {activeTab === 'food' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Foods to Include */}
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Eat More</h3>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                  <div className="space-y-4">
                    {currentPhase.foods.map((food, index) => (
                      <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                        <span className="text-2xl mr-3">{food.emoji}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{food.name}</h4>
                          <p className="text-sm text-gray-600">{food.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Foods to Avoid */}
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Limit These</h3>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                      Avoid
                    </span>
                  </div>
                  <div className="space-y-4">
                    {currentPhase.avoid.map((item, index) => (
                      <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 mr-3 flex-shrink-0">
                          ✗
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hydration */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-2xl">💧</div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Hydration Tip</h3>
                    <p className="text-sm text-blue-700 mt-1">{currentPhase.hydration}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPhase.activities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{activity.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${intensityColors[activity.intensity]}`}>
                        {activity.intensity} intensity
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-gray-500">
                      <span>⏱️ 20-30 min</span>
                      <span>🔥 {activity.intensity === 'low' ? '100-200' : activity.intensity === 'medium' ? '200-300' : '300-400'} cal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wellness Tips Tab */}
          {activeTab === 'tips' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Tips for {currentPhase.title}</h3>
              <div className="space-y-4">
                {currentPhase.tips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
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
                These are general recommendations. Please consult with a healthcare provider for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}