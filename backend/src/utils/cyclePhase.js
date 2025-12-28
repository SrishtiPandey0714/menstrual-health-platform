exports.getCyclePhase = (lastPeriodDate) => {
    if (!lastPeriodDate) return 'unknown';

    const today = new Date();
    const diffDays = Math.floor(
        (today - new Date(lastPeriodDate)) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 5) return 'menstrual';
    if (diffDays <= 13) return 'follicular';
    if (diffDays <= 15) return 'ovulation';
    return 'luteal';
};
