'use client';

import { usePersonalizedFood } from '@/hooks/usePersonalization';
import { getPhaseInfo } from '@/lib/cycleUtils';
import { calculatePhaseTimeline, formatDaysUntil } from '@/lib/phaseTimeline';
import { useCycleDetection } from '@/hooks/useCycleDetection';
import { useTranslation } from '@/contexts/TranslationContext';
import { Utensils, Loader2, Sparkles, Clock } from 'lucide-react';

interface PersonalizedFoodProps {
    phase?: string;
    showTitle?: boolean;
}

export default function PersonalizedFood({ phase = 'menstrual', showTitle = true }: PersonalizedFoodProps) {
    const { food, loading } = usePersonalizedFood(phase);
    const { cycleInfo } = useCycleDetection();
    const { t } = useTranslation();
    const phaseInfo = getPhaseInfo(phase as any);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-[#DB2777] mx-auto mb-3" />
                    <p className="text-sm text-gray-600">{t('food.generatingRecommendations')} {phaseInfo.title}...</p>
                </div>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">{t('food.noRecommendations')}</p>
            </div>
        );
    }

    // Calculate if this is the current phase
    const isCurrentPhase = cycleInfo?.phase === phase;
    const timeline = cycleInfo ? calculatePhaseTimeline(cycleInfo.day, cycleInfo.cycleLength) : [];
    const phaseTimeline = timeline.find(p => p.phase === phase);

    return (
        <div className="space-y-6">
            {/* Phase Header */}
            {showTitle && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-xl ${phaseInfo.color} mr-4`}>
                            <span className="text-2xl">{phaseInfo.icon}</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{t(`food.phases.${phase}.title`)}</h2>
                            <p className="text-sm text-gray-600 mt-1">{t(`food.phases.${phase}.description`)}</p>
                        </div>
                    </div>
                    {isCurrentPhase && (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-green-700">{t('food.currentPhase')}</span>
                        </div>
                    )}
                    {!isCurrentPhase && phaseTimeline && (
                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-700">{formatDaysUntil(phaseTimeline.daysUntilStart)}</span>
                        </div>
                    )}
                </div>
            )}

            {/* AI Badge */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">{t('food.aiPersonalized')}:</span> {t('food.allFoodNamesTranslated')}
                    </p>
                </div>
            </div>

            {/* Age-Specific Nutritional Focus */}
            {food.nutritionalFocus && (
                <div className="bg-white border-2 border-[#DB2777] rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                        <span className="bg-[#DB2777] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">!</span>
                        {t('food.nutritionalFocus')}
                    </h3>
                    <p className="text-base text-gray-800 font-medium">{food.nutritionalFocus}</p>
                </div>
            )}

            {/* AI-Personalized Food List */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Utensils className="h-5 w-5 text-[#DB2777] mr-2" />
                    {t('food.recommendedFoods')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {food.foods && food.foods.length > 0 ? (
                        food.foods.map((foodItem: string, index: number) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-pink-50 border-2 border-gray-200 hover:border-[#DB2777] rounded-xl p-4 transition-all hover:shadow-md"
                            >
                                <p className="text-gray-800 font-medium text-sm">{foodItem}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500">No food recommendations available</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lifestyle Tips - Pink themed */}
            {food.lifestyleTips && food.lifestyleTips.length > 0 && (
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('food.lifestyleTips')}</h3>
                    <ul className="space-y-2">
                        {food.lifestyleTips.map((tip: string, index: number) => (
                            <li key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-[#DB2777] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-700">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Age-Specific Tip */}
            {food.ageSpecificTip && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4">
                    <p className="text-sm text-gray-800">
                        <span className="font-bold text-yellow-700">💡 Age-Specific Tip: </span>
                        {food.ageSpecificTip}
                    </p>
                </div>
            )}
        </div>
    );
}
