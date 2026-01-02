// src/app/onboarding/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAIConsent } from '@/contexts/AIConsentContext';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const [ageError, setAgeError] = useState('');
  const { hasAIConsent: aiConsent, setAIConsent } = useAIConsent();
  const [formData, setFormData] = useState({
    ageGroup: '',
    country: '',
    language: 'en',
    gender: '',
    diet: '',
    dietaryRestrictions: '',
    accessibility: 'standard',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is under 13
    if (formData.ageGroup === 'under13') {
      setAgeError('You must be at least 13 years old to use this platform.');
      return;
    }
    
    // Check for required fields
    const requiredFields = ['ageGroup', 'country', 'language', 'gender', 'diet', 'accessibility'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      // You could add more specific error handling here
      alert('Please fill in all required fields.');
      return;
    }
    
    // Clear any previous errors
    setAgeError('');
    
    // Include AI consent in the form data
    const submissionData = {
      ...formData,
      aiConsent
    };
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', submissionData);
    
    // The AI consent is already managed by the AIConsentContext
    router.push('/dashboard');
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-pink-600">
              {step === 1 ? 'Welcome to CycleCare' : 'Complete Your Profile'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {step === 1
                ? 'Please review and accept our terms to continue'
                : 'Help us personalize your experience'}
            </p>
          </div>

          {step === 1 ? (
            <div>
              <div className="bg-pink-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-pink-800 mb-2">Important Notice</h3>
                <p className="text-pink-700 text-sm">
                  This platform provides educational and informational support only and does not replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="consent" className="font-medium text-gray-700">
                      I understand this is not a medical diagnosis tool
                    </label>
                    <p className="text-gray-500">
                      The information provided is for educational purposes and should not be used as a substitute for professional medical care
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="ai-consent"
                      name="aiConsent"
                      type="checkbox"
                      checked={aiConsent}
                      onChange={(e) => setAIConsent(e.target.checked)}
                      className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ai-consent" className="font-medium text-gray-700">
                      I consent to AI-assisted guidance
                    </label>
                    <p className="text-gray-500">
                      I understand that this platform uses artificial intelligence to provide personalized educational content and recommendations.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!consent}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      consent ? 'bg-pink-600 hover:bg-pink-700' : 'bg-pink-300 cursor-not-allowed'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700">
                  Age Group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="ageGroup"
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select your age group</option>
                    <option value="under13">Under 13</option>
                    <option value="13-17">13-17 (Teen)</option>
                    <option value="18-25">18-25</option>
                    <option value="26-40">26-40</option>
                    <option value="40+">40+</option>
                  </select>
                  {formData.ageGroup === 'under13' && (
                    <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-400 text-red-700">
                      <p className="text-sm">
                        <strong>Age Restriction:</strong> You must be at least 13 years old to use this platform.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country/Region <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select your country</option>
                  <option value="us">United States</option>
                  <option value="in">India</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language Preference <span className="text-red-500">*</span>
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="fr">Français (French)</option>
                  <option value="de">Deutsch (German)</option>
                  <option value="zh">中文 (Chinese)</option>
                </select>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="diet" className="block text-sm font-medium text-gray-700">
                  Diet Preference <span className="text-red-500">*</span>
                </label>
                <select
                  id="diet"
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select your diet preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="eggetarian">Eggetarian</option>
                  <option value="non-vegetarian">Non-vegetarian</option>
                </select>
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
                  Dietary Restrictions/Allergies
                </label>
                <div className="mt-1">
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    rows={3}
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="E.g., Peanut allergy, lactose intolerant, don't eat pork, etc."
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Please list any food allergies or specific dietary restrictions you have.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Accessibility Mode <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 space-y-2">
                  {[/* eslint-disable @typescript-eslint/no-unused-vars */
                    { id: 'standard', label: 'Standard' },
                    { id: 'simple', label: 'Simple Language' },
                    { id: 'detailed', label: 'Detailed Explanations' },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={option.id}
                        name="accessibility"
                        type="radio"
                        checked={formData.accessibility === option.id}
                        onChange={() => setFormData({ ...formData, accessibility: option.id })}
                        className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300"
                      />
                      <label htmlFor={option.id} className="ml-2 block text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Complete Setup
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}