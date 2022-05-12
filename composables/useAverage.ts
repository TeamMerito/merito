export const useAverage = (values: number[]): string => {
    if (values.length === 0) {
        return "0.0";
    }

    return (Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100).toFixed(1);
};
