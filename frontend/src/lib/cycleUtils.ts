// Cycle phase detection and calculation utilities

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export interface CycleData {
    periodStart?: string;
    cycleLength?: number;
    periodLength?: number;
    lastPeriodStart?: string;
}

/**
 * Calculate current cycle phase based on cycle data
 * @param cycleData - User's cycle information
 * @returns Current cycle phase
 */
export function calculateCurrentPhase(cycleData: CycleData): CyclePhase {
    if (!cycleData.lastPeriodStart) {
        return 'menstrual'; // Default if no data
    }

    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));

    const cycleLength = cycleData.cycleLength || 28;
    const periodLength = cycleData.periodLength || 5;

    // Menstrual Phase: Days 1-5 (period)
    if (daysSinceLastPeriod < periodLength) {
        return 'menstrual';
    }

    // Follicular Phase: Days 6-13
    if (daysSinceLastPeriod < 14) {
        return 'follicular';
    }

    // Ovulation: Days 14-16
    if (daysSinceLastPeriod < 17) {
        return 'ovulation';
    }

    // Luteal Phase: Days 17-28
    if (daysSinceLastPeriod < cycleLength) {
        return 'luteal';
    }

    // If beyond cycle length, assume new menstrual phase
    return 'menstrual';
}

/**
 * Get current cycle day (1-28+)
 */
export function getCurrentCycleDay(lastPeriodStart: string): number {
    const lastPeriod = new Date(lastPeriodStart);
    const today = new Date();
    const daysSince = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    return daysSince + 1; // Day 1 is first day of period
}

/**
 * Get days until next period
 */
export function getDaysUntilNextPeriod(lastPeriodStart: string, cycleLength: number = 28): number {
    const lastPeriod = new Date(lastPeriodStart);
    const today = new Date();
    const daysSince = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = cycleLength - daysSince;
    return daysRemaining > 0 ? daysRemaining : 0;
}

/**
 * Get phase information
 */
export function getPhaseInfo(phase: CyclePhase) {
    const phaseData = {
        menstrual: {
            title: 'Menstrual Phase',
            icon: '🩸',
            color: 'bg-pink-100 text-pink-800',
            description: 'Your period. Focus on rest and iron-rich foods.',
            tips: ['Stay hydrated', 'Rest when needed', 'Gentle exercise'],
        },
        follicular: {
            title: 'Follicular Phase',
            icon: '🌱',
            color: 'bg-green-100 text-green-800',
            description: 'Rising energy. Great time for new activities.',
            tips: ['Try new workouts', 'Social activities', 'Creative projects'],
        },
        ovulation: {
            title: 'Ovulation',
            icon: '✨',
            color: 'bg-blue-100 text-blue-800',
            description: 'Peak energy and fertility. You feel your best!',
            tips: ['High-intensity workouts', 'Social events', 'Important tasks'],
        },
        luteal: {
            title: 'Luteal Phase',
            icon: '🌙',
            color: 'bg-purple-100 text-purple-800',
            description: 'Energy declining. Focus on self-care.',
            tips: ['Gentle yoga', 'Comfort foods', 'Self-care routines'],
        },
    };

    return phaseData[phase];
}
