// Phase timeline calculation utilities

import { CyclePhase } from './cycleUtils';

export interface PhaseTimeline {
    phase: CyclePhase;
    startDay: number;
    endDay: number;
    daysUntilStart: number;
    isActive: boolean;
}

/**
 * Calculate when each phase starts and ends
 */
export function calculatePhaseTimeline(currentDay: number, cycleLength: number = 28): PhaseTimeline[] {
    const periodLength = 5;
    const follicularEnd = 13;
    const ovulationEnd = 16;

    const phases: PhaseTimeline[] = [
        {
            phase: 'menstrual',
            startDay: 1,
            endDay: periodLength,
            daysUntilStart: currentDay > periodLength ? cycleLength - currentDay + 1 : 0,
            isActive: currentDay >= 1 && currentDay <= periodLength,
        },
        {
            phase: 'follicular',
            startDay: periodLength + 1,
            endDay: follicularEnd,
            daysUntilStart: currentDay < periodLength + 1 ? periodLength + 1 - currentDay : (currentDay > follicularEnd ? cycleLength - currentDay + periodLength + 1 : 0),
            isActive: currentDay > periodLength && currentDay <= follicularEnd,
        },
        {
            phase: 'ovulation',
            startDay: follicularEnd + 1,
            endDay: ovulationEnd,
            daysUntilStart: currentDay < follicularEnd + 1 ? follicularEnd + 1 - currentDay : (currentDay > ovulationEnd ? cycleLength - currentDay + follicularEnd + 1 : 0),
            isActive: currentDay > follicularEnd && currentDay <= ovulationEnd,
        },
        {
            phase: 'luteal',
            startDay: ovulationEnd + 1,
            endDay: cycleLength,
            daysUntilStart: currentDay < ovulationEnd + 1 ? ovulationEnd + 1 - currentDay : 0,
            isActive: currentDay > ovulationEnd && currentDay <= cycleLength,
        },
    ];

    return phases;
}

/**
 * Format days until message
 */
export function formatDaysUntil(days: number): string {
    if (days === 0) return 'Current phase';
    if (days === 1) return 'Starts tomorrow';
    if (days <= 7) return `Starts in ${days} days`;
    if (days <= 14) return `Starts in ${Math.floor(days / 7)} week${days > 7 ? 's' : ''}`;
    return `Starts in ~${days} days`;
}
