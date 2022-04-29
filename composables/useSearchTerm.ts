export const useSearchTerm = (kw: string): string => {
    return kw.split(" ").map((word) => `${word}:*`).join(" | ");
};
