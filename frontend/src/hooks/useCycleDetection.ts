'use client';

import { useState, useEffect } from 'react';
import { apiCall } from '@/lib/auth';
import { calculateCurrentPhase, getCurrentCycleDay, getDaysUntilNextPeriod, CyclePhase } from '@/lib/cycleUtils';

export interface CycleInfo {
    phase: CyclePhase;
    day: number;
    daysUntilNextPeriod: number;
    lastPeriodStart: string | null;
    cycleLength: number;
}

export function useCycleDetection() {
    const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCycleData();
    }, []);

    const loadCycleData = async () => {
        try {
            const response = await apiCall('/api/cycle');

            if (response.ok) {
                const data = await response.json();

                // Get the most recent cycle log
                const logs = data.logs || [];
                if (logs.length > 0) {
                    const latestLog = logs[0];
                    const lastPeriodStart = latestLog.periodStart || latestLog.date;
                    const cycleLength = latestLog.cycleLength || 28;

                    const phase = calculateCurrentPhase({
                        lastPeriodStart,
                        cycleLength,
                        periodLength: latestLog.periodLength || 5,
                    });

                    const day = getCurrentCycleDay(lastPeriodStart);
                    const daysUntilNext = getDaysUntilNextPeriod(lastPeriodStart, cycleLength);

                    setCycleInfo({
                        phase,
                        day,
                        daysUntilNextPeriod: daysUntilNext,
                        lastPeriodStart,
                        cycleLength,
                    });
                } else {
                    // No cycle data, use defaults
                    setCycleInfo({
                        phase: 'menstrual',
                        day: 1,
                        daysUntilNextPeriod: 28,
                        lastPeriodStart: null,
                        cycleLength: 28,
                    });
                }
            }
        } catch (error) {
            console.error('Error loading cycle data:', error);
            // Fallback
            setCycleInfo({
                phase: 'menstrual',
                day: 1,
                daysUntilNextPeriod: 28,
                lastPeriodStart: null,
                cycleLength: 28,
            });
        } finally {
            setLoading(false);
        }
    };

    return { cycleInfo, loading, refreshCycleData: loadCycleData };
}
