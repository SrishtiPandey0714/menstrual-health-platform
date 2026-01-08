'use client';

import { usePersonalizedBeverages } from '@/hooks/usePersonalization';
import { useTranslation } from '@/contexts/TranslationContext';
import { Droplet, Loader2, Sparkles } from 'lucide-react';

interface BeverageRecommendationsProps {
    phase: string;
    showTitle?: boolean;
}

export default function BeverageRecommendations({ phase, showTitle = true }: BeverageRecommendationsProps) {
    const { beverages, loading } = usePersonalizedBeverages(phase);
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-[#DB2777] mx-auto mb-3" />
                    <p className="text-sm text-gray-600">{t('beverages.generatingRecommendations')}</p>
                </div>
            </div>
        );
    }

    if (!beverages) {
        return (
            <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Droplet className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">{t('beverages.noBeveragesAvailable')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            {showTitle && (
                <div className="flex items-center mb-4">
                    <div className="p-3 rounded-xl bg-purple-100 mr-4">
                        <Droplet className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{t('beverages.hydrationRecommendations')}</h2>
                        <p className="text-sm text-gray-600 mt-1">{t('beverages.stayHydratedPhase', { phase })}</p>
                    </div>
                </div>
            )}

            {/* AI Badge */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">{t('beverages.aiGenerated')}</span> {t('beverages.beveragesPersonalized', { phase })}
                    </p>
                </div>
            </div>

            {/* AI-Generated Beverages - Same style as food */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('beverages.recommendedBeverages')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {beverages.beverages && beverages.beverages.length > 0 ? (
                        beverages.beverages.map((beverage: string, index: number) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-purple-50 border-2 border-gray-200 hover:border-[#DB2777] rounded-xl p-4 transition-all hover:shadow-md flex items-center"
                            >
                                <Droplet className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                                <p className="text-gray-800 font-medium text-sm">{beverage}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500">{t('beverages.noBeveragesAvailable')}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Hydration Tips - Pink themed */}
            {beverages.tips && beverages.tips.length > 0 && (
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Droplet className="h-5 w-5 text-[#DB2777] mr-2" />
                        {t('beverages.hydrationTipsPhase', { phase: phase.charAt(0).toUpperCase() + phase.slice(1) })}
                    </h3>
                    <ul className="space-y-3">
                        {beverages.tips.map((tip: string, index: number) => (
                            <li key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-[#DB2777] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-700 font-medium">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
