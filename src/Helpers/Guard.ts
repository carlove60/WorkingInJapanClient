export const isNullOrUndefined = (value: unknown): boolean => {
    return value === null || value === undefined || typeof value === 'undefined';
}

export const isNotNullOrUndefined = (value: unknown): value is NonNullable<unknown> => {
    return value !== null && value !== undefined && typeof value !== 'undefined';
}