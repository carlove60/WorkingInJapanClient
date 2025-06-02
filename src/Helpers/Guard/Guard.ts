export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined || typeof value === "undefined";
};

export const isNotNullOrUndefined = <T>(value: T): value is Exclude<T, null | undefined> => {
  return value !== null && value !== undefined && typeof value !== "undefined";
};
