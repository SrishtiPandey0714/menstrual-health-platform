'use client';

import Link from 'next/link';
import {
  BookOpen,
  Shield,
  AlertTriangle,
  User,
  FileText,
  Scale,
  Mail,
  Lock
} from 'lucide-react';

export default function TermsOfServicePage() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
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
            <h1 className="text-3xl font-bold text-[#DB2777] mb-2">Terms of Service</h1>
            <p className="text-gray-600">Effective: {effectiveDate}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="prose prose-pink max-w-none">
          <p className="text-gray-700">
            Welcome to Luniva. By accessing or using our services, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-pink-600" />
            Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By accessing or using the Luniva platform, you agree to be bound by these Terms of Service and our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-pink-600" />
            Description of Service
          </h2>
          <p className="text-gray-700">
            Luniva provides an AI-powered platform for menstrual health tracking and education. Our services include cycle tracking, educational content, and AI-powered insights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-pink-600" />
            Not Medical Advice
          </h2>
          <p className="text-gray-700">
            The information provided through our services is for educational purposes only and is not intended as medical advice. Always consult with a healthcare provider for medical advice.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-pink-600" />
              User Accounts
            </h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-pink-600" />
              User Content
            </h2>
            <p className="text-gray-700">
              You retain ownership of any content you submit to our platform. By submitting content, you grant us a license to use, reproduce, and display such content.
            </p>
          </section>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Lock className="h-6 w-6 mr-2 text-pink-600" />
            Prohibited Conduct
          </h2>
          <p className="text-gray-700 mb-4">You agree not to:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Use our services for any illegal purpose</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Impersonate any person or entity</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Interfere with or disrupt our services</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Attempt to gain unauthorized access to our systems</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Scale className="h-6 w-6 mr-2 text-pink-600" />
            Intellectual Property
          </h2>
          <p className="text-gray-700">
            All content and materials available on our platform, including but not limited to text, graphics, logos, and software, are the property of Luniva or its licensors.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Terms</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2">Limitation of Liability</h3>
              <p className="text-gray-700">
                To the maximum extent permitted by law, Luniva shall not be liable for any indirect, incidental, or consequential damages resulting from your use of our services.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2">Changes to Terms</h3>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. We will provide notice of any material changes to the terms.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2">Governing Law</h3>
              <p className="text-gray-700">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Luniva operates.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900 mb-2 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-pink-600" />
                Contact Us
              </h3>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@luniva.com" className="text-pink-600 hover:text-pink-500 font-medium">
                  legal@luniva.com
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}