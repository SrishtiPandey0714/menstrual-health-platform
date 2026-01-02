// src/app/responsible-ai/page.tsx
'use client';

import { Shield, Lock, Eye, Users, Target, Heart, AlertCircle, CheckCircle, MessageSquare, BarChart, Zap, UserCheck } from 'lucide-react';

export default function ResponsibleAIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#DB2777] mb-2">Our Commitment to Responsible AI</h1>
            <p className="text-gray-600">Ethical, Transparent, and Human-Centric AI for Women's Health</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="prose prose-pink max-w-none">
          <p className="text-gray-700">
            At CycleCare, we believe that Artificial Intelligence must be ethical, transparent, inclusive, and human-centric, 
            especially when applied to sensitive domains such as women's health and menstrual well-being.
          </p>
          <p className="text-gray-700">
            Our AI features are designed to support—not replace—human judgment, empower users with reliable information, 
            and respect individual choice, privacy, and dignity at every step.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-pink-600" />
            Purpose of AI in Our Platform
          </h2>
          <p className="text-gray-700 mb-4">We use AI to:</p>
          <ul className="space-y-3 text-gray-700">
            {[
              "Provide educational and supportive responses related to menstrual health",
              "Offer symptom awareness and general guidance",
              "Improve accessibility to health information",
              "Help users feel heard, supported, and informed"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mt-4 font-medium">
            AI on this platform does not diagnose, prescribe, or replace medical professionals.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-pink-600" />
              User Consent & Control
            </h3>
            <p className="text-gray-700 mb-3">User autonomy is central to our AI design.</p>
            <ul className="space-y-2 text-gray-700">
              {[
                "AI-powered features are optional",
                "Users can choose whether or not to use AI",
                "If consent is not provided, core platform features remain fully accessible",
                "Users can disable AI interactions at any time"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-3 font-medium">
              No user is forced to engage with AI to use essential services.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-pink-600" />
              Data Privacy & Protection
            </h3>
            <p className="text-gray-700 mb-3">We follow privacy-first principles:</p>
            <ul className="space-y-2 text-gray-700">
              {[
                "We do not sell user data",
                "Personal health data is never used to train AI models",
                "Conversations with AI are not shared with third parties",
                "Data collection is minimal and purpose-limited",
                "Data is handled using secure and industry-standard practices"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <AlertCircle className="h-6 w-6 mr-2 text-pink-600" />
            Safety & Medical Responsibility
          </h2>
          <p className="text-gray-700 mb-4">To ensure user safety:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "AI responses are restricted to informational and educational content",
              "High-risk symptoms trigger clear guidance to seek medical help",
              "Emergency scenarios surface local helplines and professional resources",
              "The AI avoids speculative, harmful, or alarmist responses",
              "We clearly communicate that AI is not a medical authority"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-pink-600" />
              Fairness & Inclusivity
            </h3>
            <p className="text-gray-700 mb-3">We actively design our AI to be:</p>
            <ul className="space-y-2 text-gray-700">
              {[
                "Inclusive of diverse genders, bodies, cultures, and experiences",
                "Free from stereotypes, stigma, or judgment",
                "Using neutral, respectful, and non-discriminatory language",
                "Supportive of users from different backgrounds"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-3">
              We continuously evaluate outputs to reduce bias and improve inclusivity.
            </p>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-pink-600" />
              Transparency & Accountability
            </h3>
            <p className="text-gray-700 mb-3">We believe users deserve clarity:</p>
            <ul className="space-y-2 text-gray-700">
              {[
                "AI interactions are clearly labeled",
                "Users are informed when interacting with AI",
                "We explain what AI can and cannot do",
                "System limitations are openly acknowledged",
                "No hidden automation"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="bg-pink-50 p-8 rounded-xl border border-pink-100">
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Our Promise</h2>
          <p className="text-pink-800 text-lg">
            We promise to use AI with care, respect, and responsibility, ensuring that technology serves people—not the other way around.
          </p>
        </section>
      </main>
    </div>
  );
}