/**
 * NaN is a number. Ensuring we don't get false positives
 * @param value
 */
export const isNumeric = (value: unknown): value is number => {
  if (typeof value === "number" && !isNaN(value)) {
    return true;
  }

  if (typeof value !== "string") {
    return false;
  }

  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};
