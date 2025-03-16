export const IsNullOrUndefined = (value: unknown): boolean => {
    return value === null || value === undefined || typeof value === 'undefined';
}