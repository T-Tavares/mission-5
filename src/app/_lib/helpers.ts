export const removeDuplicateNumbers = (arr: number[]) => {
    return [...new Set(arr)];
};
