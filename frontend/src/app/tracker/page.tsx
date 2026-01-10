'use client';

'use client';

import { useState } from 'react';
import { Droplet, Calendar, AlertCircle, Phone, HeartPulse, Trash2 } from 'lucide-react';

type Tab = 'tracker' | 'history';

type Mood = 'happy' | 'calm' | 'sad' | 'angry' | 'anxious' | 'neutral' | 'emotional';

interface CycleEntry {
  date: string;
  flow: string;
  painLevel: number;
  symptoms: string;
  mood?: Mood;
}

export default function CycleTrackerPage() {
  const [activeTab, setActiveTab] = useState<Tab>('tracker');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const [formData, setFormData] = useState<CycleEntry>({
    date: new Date().toISOString().split('T')[0],
    flow: '',
    painLevel: 0,
    symptoms: '',
    mood: 'neutral',
  });

  const [history, setHistory] = useState<CycleEntry[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'painLevel' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.painLevel >= 8) {
      setShowEmergencyModal(true);
    }

    setHistory(prev => [...prev, { ...formData }]);

    setFormData({
      date: new Date().toISOString().split('T')[0],
      flow: '',
      painLevel: 0,
      symptoms: '',
      mood: 'neutral',
    });
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setHistory(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold flex items-center text-[#DB2777]">
              <Droplet className="h-5 w-5 mr-2.5 text-[#DB2777]" />
              Cycle Tracker
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-t-lg p-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'tracker'
                ? 'bg-white shadow-sm text-pink-600'
                : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
            }`}
          >
            Log Entry
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-white shadow-sm text-pink-600'
                : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
            }`}
          >
            History
          </button>
        </div>

        {/* Emergency Modal */}
        {showEmergencyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-red-600 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Medical Attention Recommended
                </h2>
                <button 
                  onClick={() => setShowEmergencyModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-700 mb-4">
                Severe pain has been detected. Please consider seeking medical help.
              </p>

              <div className="space-y-2 mb-4">
                <a
                  href="tel:108"
                  className="flex items-center justify-center p-3 bg-red-50 rounded-lg text-red-700 font-medium hover:bg-red-100 transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4" /> Emergency (108)
                </a>
                <a
                  href="tel:1091"
                  className="flex items-center justify-center p-3 bg-blue-50 rounded-lg text-blue-700 font-medium hover:bg-blue-100 transition-colors"
                >
                  <HeartPulse className="mr-2 h-4 w-4" /> Women's Helpline (1091)
                </a>
              </div>

              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tracker' ? (
          <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
            <div className="p-6 space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Flow
                </label>
                <select
                  name="flow"
                  value={formData.flow}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white"
                >
                  <option value="">Select flow level</option>
                  <option value="Light">Light</option>
                  <option value="Medium">Medium</option>
                  <option value="Heavy">Heavy</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Pain Level
                  </label>
                  <span className="text-sm text-gray-500">{formData.painLevel}/10</span>
                </div>
                <div className="mt-1">
                  <input
                    type="range"
                    name="painLevel"
                    min="0"
                    max="10"
                    value={formData.painLevel}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-600 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  How are you feeling? <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="flex justify-between py-2">
                  {[
                    { value: 'happy', emoji: '😊', label: 'Happy' },
                    { value: 'calm', emoji: '😌', label: 'Calm' },
                    { value: 'sad', emoji: '😢', label: 'Sad' },
                    { value: 'angry', emoji: '😠', label: 'Angry' },
                    { value: 'anxious', emoji: '😰', label: 'Anxious' },
                    { value: 'neutral', emoji: '😐', label: 'Neutral' },
                    { value: 'emotional', emoji: '🥺', label: 'Emotional' },
                  ].map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mood: mood.value as Mood }))}
                      className={`flex flex-col items-center p-2 rounded-full transition-colors ${
                        formData.mood === mood.value 
                          ? 'bg-pink-100 text-pink-600' 
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      title={mood.label}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-xs mt-1">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Symptoms <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="mt-1">
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 resize-none"
                    placeholder="Describe any symptoms you're experiencing..."
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-b-xl rounded-tr-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
            <div className="p-6">
              {history.length === 0 ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Start tracking your cycle to see your history here.
                  </p>
                  <button
                    onClick={() => setActiveTab('tracker')}
                    className="inline-flex items-center px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                  >
                    Add First Entry
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {history.map((item, index) => (
                    <li key={index} className="py-4 first:pt-0 last:pb-0 group">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                            <span className="ml-2 text-sm font-normal text-gray-500">{item.flow}</span>
                          </p>
                          {item.symptoms && (
                            <p className="text-sm text-gray-500 mt-1">
                              {item.symptoms}
                            </p>
                          )}
                          {item.mood && (
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                                {{
                                  happy: '😊 Happy',
                                  calm: '😌 Calm',
                                  sad: '😢 Sad',
                                  angry: '😠 Angry',
                                  anxious: '😰 Anxious',
                                  neutral: '😐 Neutral',
                                  emotional: '🥺 Emotional'
                                }[item.mood]}
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(index);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-2"
                          title="Delete entry"
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.painLevel >= 8 ? 'bg-red-100 text-red-800' :
                            item.painLevel >= 5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Pain: {item.painLevel}/10
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
