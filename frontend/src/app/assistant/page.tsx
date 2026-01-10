// src/app/assistant/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAIConsent } from '@/contexts/AIConsentContext';
import { useTranslation } from '@/contexts/TranslationContext';
import Link from 'next/link';
import { Trash2, Globe, Send, Bot, User, MessageSquare, X, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'de', name: 'Deutsch' },
];

export default function AIChatbot() {
  const { hasAIConsent } = useAIConsent();
  const { t, language: globalLanguage, setLanguage: setGlobalLanguage } = useTranslation();
  const [language, setLanguage] = useState(globalLanguage);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('aiConsent') === 'true') {
      return [
        {
          id: '1',
          content: t('assistant.greeting'),
          sender: 'ai',
          timestamp: new Date(),
        },
      ];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What are the common symptoms of PCOS?",
    "How can I manage period cramps naturally?",
    "What's the difference between PMS and PMDD?",
    "What are some healthy period foods?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteConversation = () => {
    setMessages([{
      id: '1',
      content: t('assistant.greeting'),
      sender: 'ai',
      timestamp: new Date(),
    }]);
    setShowDeleteConfirm(false);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setGlobalLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !hasAIConsent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get real auth token from localStorage
      const authToken = localStorage.getItem('auth_token');

      if (!authToken) {
        throw new Error('Not authenticated');
      }

      console.log('🔑 Using real auth token for AI request');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer || data.message || 'Sorry, I could not generate a response.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI API Error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter out the initial AI message for display
  const displayMessages = messages.length <= 1 ? [] : messages.slice(1);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#DB2777] text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">{t('assistant.title')}</h1>
              <p className="text-sm text-pink-100">{t('assistant.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{globalLanguage === 'en' ? 'English' : t(`languages.${globalLanguage}`)}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b mb-1">
                      {t('assistant.selectLanguage')}
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md ${language === lang.code
                          ? 'bg-pink-100 text-pink-700'
                          : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={messages.length <= 1}
              className={`p-2 rounded-full ${messages.length > 1 ? 'text-white/80 hover:bg-white/10' : 'text-white/30 cursor-not-allowed'}`}
              title={messages.length > 1 ? t('assistant.clearConversation') : t('assistant.noMessages')}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 max-w-4xl w-full mx-auto">
        {!hasAIConsent ? (
          <div className="h-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('assistant.aiDisabled')}</h3>
              <p className="text-gray-600 mb-6">
                {t('assistant.aiDisabledDesc')}
              </p>
              <Link
                href="/settings"
                className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
              >
                {t('assistant.goToSettings')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="bg-pink-100 p-4 rounded-full mb-6">
                  <Bot className="h-10 w-10 text-pink-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('assistant.howCanIHelp')}</h2>
                <p className="text-gray-500 mb-8 max-w-md">
                  {t('assistant.askAnything')}
                </p>

                <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question);
                        setTimeout(() => {
                          const event = { preventDefault: () => { } } as React.FormEvent;
                          handleSubmit(event);
                        }, 100);
                      }}
                      className="p-3 text-left bg-white border border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-colors text-sm text-gray-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${index === 0 ? 'pt-2' : ''}`}
                  >
                    <div
                      className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''
                        }`}
                    >
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.sender === 'user'
                          ? 'ml-3 bg-pink-500 text-white'
                          : 'mr-3 bg-purple-500 text-white'
                          }`}
                      >
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-2.5 rounded-2xl ${message.sender === 'user'
                          ? 'bg-pink-500 text-white rounded-tr-none'
                          : 'bg-white border border-gray-200 rounded-tl-none shadow-sm'
                          }`}
                      >
                        {message.sender === 'ai' ? (
                          <div className="text-sm prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-headings:mt-3 prose-headings:mb-2">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                        <p
                          className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-pink-100' : 'text-gray-400'
                            }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-2xl border border-gray-200 shadow-sm w-fit">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 py-3 px-4 fixed bottom-0 w-full">
        <div className="max-w-4xl mx-auto relative">
          <form onSubmit={handleSubmit} className="flex items-end space-x-2">
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-400 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('assistant.placeholder')}
                rows={1}
                className="w-full bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 text-gray-800 placeholder-gray-400 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={!hasAIConsent}
              />
              <div className="flex justify-between items-center px-3 py-1 border-t border-gray-100">
                <div className="flex space-x-1">
                  <button
                    type="button"
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    title={t('assistant.comingSoon')}
                    disabled
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  {messages.length > 1 ? `${messages.length - 1} ${t('assistant.messagesCount')}` : t('assistant.newChat')}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={!hasAIConsent || !input.trim() || isLoading}
              className={`p-3 rounded-full ${input.trim() && hasAIConsent && !isLoading
                ? 'bg-pink-600 hover:bg-pink-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } transition-colors`}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
          <p className="text-xs text-center text-gray-400 mt-2">
            {t('assistant.disclaimer')}
          </p>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">{t('assistant.clearConversation')}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {t('assistant.clearConversationDesc')}
                </p>
              </div>
              <div className="mt-5 flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConversation}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {t('assistant.clearChat')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}