// src/app/learn/page.tsx
'use client';

import { useState } from 'react';
import { BookOpen, Lightbulb, Heart, Users, MessageSquare, Search, ChevronDown } from 'lucide-react';

type Resource = {
  id: string;
  title: string;
  category: 'basics' | 'myths' | 'emotional' | 'professional' | 'support';
  content: string;
  audience: ('teens' | 'adults' | 'allies')[];
  language: string;
  readTime?: string;
  isNew?: boolean;
};

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Your Menstrual Cycle',
    category: 'basics',
    content: 'A comprehensive guide to the different phases of the menstrual cycle and what to expect during each phase.',
    audience: ['teens', 'adults'],
    language: 'en',
    readTime: '5 min read',
    isNew: true
  },
  {
    id: '2',
    title: 'Debunking Common Myths',
    category: 'myths',
    content: 'Separating fact from fiction about menstrual health and hygiene practices.',
    audience: ['teens', 'adults', 'allies'],
    language: 'en',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Emotional Well-being',
    category: 'emotional',
    content: 'Coping strategies for managing mood changes and emotional health throughout your cycle.',
    audience: ['teens', 'adults'],
    language: 'en',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'When to Seek Professional Help',
    category: 'professional',
    content: 'Recognizing when period symptoms might indicate a more serious health condition.',
    audience: ['adults'],
    language: 'en',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'Supporting Someone with Period Pain',
    category: 'support',
    content: 'Practical ways to support friends or family members who experience painful periods.',
    audience: ['allies'],
    language: 'en',
    readTime: '5 min read',
    isNew: true
  },
];

const categoryIcons = {
  basics: BookOpen,
  myths: Lightbulb,
  emotional: Heart,
  professional: Users,
  support: MessageSquare
} as const;

const categoryColors = {
  basics: 'bg-blue-100 text-blue-800',
  myths: 'bg-purple-100 text-purple-800',
  emotional: 'bg-pink-100 text-pink-800',
  professional: 'bg-green-100 text-green-800',
  support: 'bg-yellow-100 text-yellow-800'
} as const;

export default function EducationalHub() {
  const [filters, setFilters] = useState({
    category: 'all',
    audience: 'all',
    language: 'en'
  });

  const filteredResources = resources.filter(resource => {
    return (
      (filters.category === 'all' || resource.category === filters.category) &&
      (filters.audience === 'all' || resource.audience.includes(filters.audience as any)) &&
      resource.language === filters.language
    );
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Learn About <span className="text-[#DB2777]">Menstrual Health</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-base text-gray-600 sm:mt-3">
              Evidence-based resources to help you understand and manage your menstrual health
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DB2777] focus:ring-offset-1 text-gray-900 text-sm"
                  placeholder="Search resources..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mt-8">
          {/* Filters */}
          <div className="bg-white shadow-sm rounded-lg p-5 mb-8 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="appearance-none block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 rounded-lg transition-all duration-200"
                  >
                    <option value="all">All Categories</option>
                    <option value="basics">Basics</option>
                    <option value="myths">Myths & Facts</option>
                    <option value="emotional">Emotional Health</option>
                    <option value="professional">Professional Help</option>
                    <option value="support">Supporting Others</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-2">
                  For
                </label>
                <div className="relative">
                  <select
                    id="audience"
                    value={filters.audience}
                    onChange={(e) => setFilters({...filters, audience: e.target.value})}
                    className="appearance-none block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 rounded-lg transition-all duration-200"
                  >
                    <option value="all">Everyone</option>
                    <option value="teens">Teens</option>
                    <option value="adults">Adults</option>
                    <option value="allies">Supporters</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <div className="relative">
                  <select
                    id="language"
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                    className="appearance-none block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 rounded-lg transition-all duration-200"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filters.category === 'all' ? 'All Resources' : 
                 filters.category.charAt(0).toUpperCase() + filters.category.slice(1) + ' Resources'}
                {filters.audience !== 'all' && ` for ${filters.audience}`}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((resource) => {
                const Icon = categoryIcons[resource.category];
                const categoryColor = categoryColors[resource.category].split(' ')[0];
                
                return (
                  <div 
                    key={resource.id} 
                    className="group bg-white overflow-hidden rounded-lg shadow-sm hover:shadow transition-all duration-200 border border-gray-200 hover:border-[#FCE7F3]"
                  >
                    <div className="p-5">
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 rounded-xl p-3 ${categoryColors[resource.category].split(' ')[0]} bg-opacity-20`}>
                          <Icon className={`h-6 w-6 ${categoryColor.replace('text-', 'text-')}`} />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[resource.category]}`}>
                              {resource.category === 'basics' ? 'Basics' : 
                               resource.category === 'myths' ? 'Myths & Facts' :
                               resource.category === 'emotional' ? 'Emotional Health' :
                               resource.category === 'professional' ? 'Professional Help' : 'Supporting Others'}
                            </span>
                            {resource.isNew && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                New
                              </span>
                            )}
                          </div>
                          <h3 className="mt-2 text-base font-semibold text-gray-800 group-hover:text-[#DB2777] transition-colors">
                            {resource.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                            {resource.content}
                          </p>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex space-x-2">
                              {resource.audience.map((aud) => (
                                <span
                                  key={aud}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-[#FCE7F3] transition-colors"
                                >
                                  {aud === 'teens' ? 'Teens' : aud === 'adults' ? 'Adults' : 'Allies'}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">{resource.readTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-[#DB2777] hover:text-[#9D174D] group-hover:underline hover:bg-[#FCE7F3] px-2 py-1 rounded-md -ml-2"
                        >
                          Read more
                          <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-1.5 rounded-full text-gray-400 hover:text-[#DB2777] hover:bg-[#FCE7F3] transition-colors">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                          <button className="p-1.5 rounded-full text-gray-400 hover:text-[#DB2777] hover:bg-[#FCE7F3] transition-colors">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or search to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setFilters({ category: 'all', audience: 'all', language: 'en' })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-[#FCE7F3] rounded-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-3 rounded-full mb-4 shadow-sm">
                  <MessageSquare className="h-6 w-6 text-[#DB2777]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Need personalized guidance?</h2>
                <p className="mt-2 max-w-2xl text-gray-600 text-base">
                  Our <span className="text-[#DB2777] font-medium">AI Health Assistant</span> is here to answer your questions and provide tailored information about menstrual health.
                </p>
                <div className="mt-6">
                  <a
                    href="/assistant"
                    className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#DB2777] hover:bg-[#BE185D] transition-colors duration-200 hover:shadow-md"
                  >
                    Try AI Assistant
                    <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white/50 text-center border-t border-gray-100">
              <p className="text-xs text-gray-500">
                All information is confidential and based on the latest medical research
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}