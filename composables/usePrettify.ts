export const usePrettify = (text: any): string => {
    return computed(() => JSON.stringify(text, null, 2)).value;
};
