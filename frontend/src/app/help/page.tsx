// src/app/help/page.tsx
'use client';

import { useState } from 'react';

export default function HelpPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const emergencyContacts = [
    { country: 'United States', number: '988', service: 'Suicide & Crisis Lifeline' },
    { country: 'United Kingdom', number: '116 123', service: 'Samaritans' },
    { country: 'India', number: '9152987821', service: 'Vandrevala Foundation' },
    { country: 'Canada', number: '1-833-456-4566', service: 'Crisis Services Canada' },
    { country: 'Australia', number: '13 11 14', service: 'Lifeline' },
  ];

  const faqs = [
    {
      question: 'Is this a medical service?',
      answer: 'No, this platform provides educational and informational support only. It is not a substitute for professional medical advice, diagnosis, or treatment.',
    },
    {
      question: 'What should I do in a medical emergency?',
      answer: 'In case of a medical emergency, please contact your local emergency services immediately or go to the nearest hospital.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on "Forgot Password" on the login page. You will receive an email with instructions to create a new password.',
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find answers to common questions and get the help you need
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
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
              <h3 className="text-lg font-medium text-red-800">Medical Emergency</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  If you are experiencing a medical emergency, please contact your local emergency services immediately or go to the nearest hospital.
                </p>
                <p className="mt-2 font-medium">
                  This platform cannot provide emergency medical assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-medium text-gray-900">Emergency Contacts</h2>
            <p className="mt-1 text-sm text-gray-500">
              Important phone numbers for immediate assistance
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900">{contact.country}</h3>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-pink-600">{contact.number}</p>
                    <p className="text-sm text-gray-500">{contact.service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-medium text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Find answers to common questions about using our platform
            </p>

            <div className="mt-6 space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full px-4 py-4 text-left text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    onClick={() => toggleSection(`faq-${index}`)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{faq.question}</span>
                      <svg
                        className={`h-5 w-5 text-gray-500 transform transition-transform ${
                          expandedSection === `faq-${index}` ? 'rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                  {expandedSection === `faq-${index}` && (
                    <div className="px-4 pb-4 text-sm text-gray-500 bg-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-medium text-gray-900">Contact Support</h2>
            <p className="mt-1 text-sm text-gray-500">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Email Us</h3>
                <p className="mt-1 text-sm text-gray-500">
                  support@cyclecare.com
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Response time: Within 24 hours
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Help Center</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Visit our help center for detailed guides and tutorials.
                </p>
                <a
                  href="/help-center"
                  className="mt-2 inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-500"
                >
                  Visit Help Center
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Responsible AI Notice */}
        <div className="mt-8 bg-pink-50 border-l-4 border-pink-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-pink-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-pink-800">About Our AI</h3>
              <div className="mt-2 text-sm text-pink-700">
                <p>
                  Our AI assistant is designed to provide educational information only. It cannot diagnose conditions, 
                  provide treatment, or handle emergencies. Always consult with a healthcare provider for medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}