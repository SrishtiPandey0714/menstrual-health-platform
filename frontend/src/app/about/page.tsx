'use client';

import { Heart, Shield, Users, Lightbulb, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-center text-[#DB2777] mb-4">About Us</h1>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
            Empowering Menstrual Health Through Knowledge, Compassion, and Technology
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="prose prose-pink max-w-none">
          <p className="text-gray-700">
            At CycleCare, we believe menstrual health is a fundamental part of overall well-being — not a taboo. Yet for millions of people, access to accurate information, personalized guidance, and supportive resources remains limited. Our mission is to change that.
          </p>
          <p className="text-gray-700">
            CycleCare is a thoughtfully designed digital platform that helps individuals understand, track, and manage their menstrual health with confidence. By combining evidence-based health knowledge with inclusive design and optional AI-powered support, we aim to create a safe, respectful, and empowering experience for everyone who menstruates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-pink-600" />
            Our Purpose
          </h2>
          <p className="text-gray-700 mb-6">
            Menstrual health is deeply personal, and every body is different. CycleCare was built to:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Reduce misinformation and stigma around menstruation</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Provide accessible, reliable menstrual health education</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Support informed decision-making through personalized insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Create a safe digital space where privacy, consent, and trust come first</span>
            </li>
          </ul>
          <p className="text-gray-700 mt-6">
            We recognize that technology should support people — not replace human understanding. That principle guides every feature we build.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-pink-600" />
            How We Use Technology Responsibly
          </h2>
          <p className="text-gray-700 mb-4">
            CycleCare offers both non-AI and AI-powered features. While core functionalities like cycle tracking, reminders, and educational resources are available to all users, AI-based assistance is entirely optional and consent-driven.
          </p>
          <p className="text-gray-700 font-medium mb-2">We follow a privacy-first and user-controlled approach:</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>AI features are disabled by default</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Explicit consent is required before any AI processing</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Users can withdraw consent at any time</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Health data is handled securely and transparently</span>
            </li>
          </ul>
          <p className="text-gray-700">
            Our goal is to ensure that users always remain in control of their data and how it is used.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-pink-600" />
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Inclusivity</h3>
              <p className="text-gray-700">
                CycleCare is designed for all people who menstruate, regardless of gender identity, background, or life stage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Privacy & Trust</h3>
              <p className="text-gray-700">
                We treat health data with the sensitivity it deserves, following strong security practices and ethical design standards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Empathy-Driven Design</h3>
              <p className="text-gray-700">
                Menstrual health is not just biological — it is emotional, social, and deeply human. Our platform reflects that understanding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Responsible Innovation</h3>
              <p className="text-gray-700">
                We believe AI should enhance access to information without compromising autonomy or safety.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            We envision a future where menstrual health is openly discussed, well understood, and supported by compassionate technology. CycleCare strives to be more than an app — we aim to be a trusted companion in every user's health journey.
          </p>
          <p className="text-gray-700">
            By fostering awareness, reducing stigma, and prioritizing ethical innovation, we hope to contribute to a healthier, more informed, and more equitable world.
          </p>
          <p className="text-pink-600 font-medium mt-6 italic">
            Because understanding your body should never come with judgment — only support.
          </p>
        </section>
      </main>
    </div>
  );
}
