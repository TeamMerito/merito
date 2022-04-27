export const useAverage = (values: number[]): number => {
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 1e2) / 1e2;
};
