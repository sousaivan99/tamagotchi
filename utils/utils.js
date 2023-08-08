export const sleepAdjustment = sleep > 80
    ? 10
    : sleep > 50
        ? 35
        : sleep > 20
            ? 45
            : 55;