// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight, FiCheckCircle, FiShield, FiGlobe, FiHeart } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FiHeart className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">CycleCare</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
              >
                Log in
              </button>
              <button
                onClick={handleGetStarted}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
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
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  A compassionate, AI-powered platform that helps you understand and manage your menstrual health with personalized insights and support.
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="rounded-md shadow"
                  >
                    <button
                      onClick={handleGetStarted}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                      <FiArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-3 sm:mt-0 sm:ml-3"
                  >
                    <button
                      onClick={handleLearnMore}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn more
                    </button>
                  </motion.div>
                </div>
              </div>
            </main>
          </div>
          <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-pink-50 to-pink-100 overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                  <Image
                    src="/logo.png"
                    alt="Empowering menstrual health"
                    fill
                    className="object-cover object-center scale-125"
                    style={{
                      objectPosition: 'center 20%',
                      transform: 'scale(1.5)'
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      console.log('Using fallback styling');
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                    priority
                    unoptimized={process.env.NODE_ENV !== 'production'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-pink-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to understand your cycle
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform combines technology with empathy to support your menstrual health journey.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
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
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-pink-100 text-pink-600">
                      {feature.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to take control of your menstrual health?</span>
            <span className="block text-pink-600">Start your journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              >
                Get started
                <FiArrowRight className="ml-3 -mr-1 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}