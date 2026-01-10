// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiShield, FiGlobe, FiHeart } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            {/* Text Content - LEFT SIDE */}
            <div className="mb-12 lg:mb-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block">Empowering Menstrual</span>
                <span className="block text-pink-600">Health Through</span>
                <span className="block text-pink-600">Awareness & AI</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 text-lg text-gray-500 max-w-2xl"
              >
                A compassionate, AI-powered platform that helps you understand and manage your menstrual health with personalized insights and support.
              </motion.p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <button
                    onClick={handleGetStarted}
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                  >
                    Get started
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <button
                    onClick={handleLearnMore}
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200"
                  >
                    Learn more
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Hero Image - RIGHT SIDE */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md mx-auto">
                <img
                  className="w-full h-auto"
                  src="/images/hero-woman.png"
                  alt="Woman silhouette - representing menstrual health empowerment"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-pink-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-3 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to understand your cycle
            </p>
            <p className="mt-5 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform combines technology with empathy to support your menstrual health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <FiCheckCircle className="h-6 w-6 text-pink-500" />,
                title: 'Cycle Tracking',
                description: 'Track your menstrual cycle, symptoms, and moods with our intuitive calendar interface.'
              },
              {
                icon: <FiShield className="h-6 w-6 text-pink-500" />,
                title: 'Privacy First',
                description: 'Your health data belongs to you. We use encryption and follow strict privacy standards.'
              },
              {
                icon: <FiGlobe className="h-6 w-6 text-pink-500" />,
                title: 'Inclusive Design',
                description: 'Created for all people who menstruate, regardless of gender identity or background.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-100 text-pink-600">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to take control of your menstrual health?</span>
                <span className="block text-pink-600 mt-2">Start your journey today.</span>
              </h2>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 shadow-md"
              >
                Get started
                <FiArrowRight className="ml-3 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center gap-6 mb-8" aria-label="Footer">
            {['About', 'Blog', 'Privacy', 'Terms'].map((item) => (
              <a key={item} href="#" className="text-base text-gray-500 hover:text-gray-900">
                {item}
              </a>
            ))}
          </nav>
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Luniva. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
