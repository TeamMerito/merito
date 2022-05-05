export const useAverage = (values: number[]): number | null => {
    if (values.length === 0)
        return null;
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 1e2) / 1e2;
};
