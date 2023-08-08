export const updateMood = (avgValue, happinessValue) => {
    if (happinessValue < 30) {
        return 'sad';
    } else if (happinessValue < 50) {
        return 'idle';
    } else if (avgValue > 60) {
        return 'happy';
    } else if (avgValue <= 60 && avgValue > 30) {
        return 'idle';
    } else {
        return 'sad';
    }
};