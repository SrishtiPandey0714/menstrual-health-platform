'use client';

import { useCycleDetection } from '@/hooks/useCycleDetection';
import { getPhaseInfo } from '@/lib/cycleUtils';
import { calculatePhaseTimeline, formatDaysUntil } from '@/lib/phaseTimeline';
import { Sparkles, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AIInsights() {
    const { cycleInfo, loading } = useCycleDetection();

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    if (!cycleInfo) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-500 text-sm">No cycle data available. Start tracking to see AI insights!</p>
            </div>
        );
    }

    const currentPhase = getPhaseInfo(cycleInfo.phase);
    const timeline = calculatePhaseTimeline(cycleInfo.day, cycleInfo.cycleLength);

    return (
        <div className="space-y-4">
            {/* Current Phase Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Sparkles className="h-5 w-5 text-[#DB2777] mr-2" />
                            <h3 className="font-semibold text-gray-900">Your Cycle Today</h3>
                        </div>
                        <span className="text-xs font-medium text-gray-500">Day {cycleInfo.day}</span>
                    </div>
                </div>

                <div className="p-4">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${currentPhase.color} mb-3`}>
                        <span className="text-lg mr-2">{currentPhase.icon}</span>
                        {currentPhase.title}
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{currentPhase.description}</p>

                    {/* Next Period Countdown */}
                    {cycleInfo.daysUntilNextPeriod > 0 && (
                        <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-700">Next period</span>
                                <span className="text-sm font-bold text-[#DB2777]">
                                    {cycleInfo.daysUntilNextPeriod} {cycleInfo.daysUntilNextPeriod === 1 ? 'day' : 'days'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Phase Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-[#DB2777] mr-2" />
                        <h3 className="font-semibold text-gray-900">Phase Timeline</h3>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {timeline.map((phaseData) => {
                        const info = getPhaseInfo(phaseData.phase);
                        return (
                            <div
                                key={phaseData.phase}
                                className={`relative border rounded-lg p-3 transition-all ${phaseData.isActive
                                        ? 'border-[#DB2777] bg-pink-50'
                                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                {phaseData.isActive && (
                                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                            <span className="text-base mr-2">{info.icon}</span>
                                            <span className="font-medium text-gray-900 text-sm">{info.title}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">
                                            Days {phaseData.startDay}-{phaseData.endDay} of cycle
                                        </p>
                                        <div className={`text-xs font-medium ${phaseData.isActive ? 'text-[#DB2777]' : 'text-gray-500'
                                            }`}>
                                            {formatDaysUntil(phaseData.daysUntilStart)}
                                        </div>
                                    </div>

                                    {!phaseData.isActive && (
                                        <Link
                                            href={`/food?phase=${phaseData.phase}`}
                                            className="text-xs text-[#DB2777] hover:text-[#BE185D] font-medium whitespace-nowrap ml-2"
                                        >
                                            View tips →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Quick Actions</h3>
                <div className="space-y-2">
                    <Link
                        href="/food"
                        className="block w-full text-center bg-[#DB2777] hover:bg-[#BE185D] text-white rounded-lg py-2 text-sm font-medium transition-colors"
                    >
                        View Food Recommendations
                    </Link>
                    <Link
                        href="/tracker"
                        className="block w-full text-center border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg py-2 text-sm font-medium transition-colors"
                    >
                        Log Cycle Data
                    </Link>
                </div>
            </div>
        </div>
    );
}
