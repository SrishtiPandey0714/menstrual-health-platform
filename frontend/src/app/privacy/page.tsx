'use client';

import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Users, 
  Mail, 
  AlertTriangle 
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#DB2777] mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="prose prose-pink max-w-none">
          <p className="text-gray-700">
            At CycleCare, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Server className="h-6 w-6 mr-2 text-pink-600" />
            Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">We collect several types of information from and about users of our website, including:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Personal information such as name, email address, and date of birth</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Health and wellness information you choose to provide</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Usage data and analytics about how you interact with our services</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Device and browser information</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-pink-600" />
            How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Provide and maintain our services</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Personalize your experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Improve our services and develop new features</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Communicate with you about updates and offers</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Ensure the security of our services</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Lock className="h-6 w-6 mr-2 text-pink-600" />
            Data Security & Your Rights
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Data Security</h3>
              <p className="text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Your Data Rights</h3>
              <ul className="space-y-1 text-gray-700">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>Access your personal data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>Request correction or deletion of your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>Object to processing of your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>Request data portability</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2 text-pink-600" />
                Third-Party Services
              </h3>
              <p className="text-gray-700">
                We may use third-party services to help operate our website and deliver services. These third parties have access to your information only to perform specific tasks on our behalf.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-pink-600" />
                Children's Privacy
              </h3>
              <p className="text-gray-700">
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-pink-600" />
                Policy Updates
              </h3>
              <p className="text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-pink-600" />
                Contact Us
              </h3>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@cyclecare.com" className="text-pink-600 hover:text-pink-500 font-medium">
                  privacy@cyclecare.com
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}