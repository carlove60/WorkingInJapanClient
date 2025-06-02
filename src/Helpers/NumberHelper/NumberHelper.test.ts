import { isNumeric } from "./NumberHelper";

describe("isNumeric", () => {
  it("returns true for valid numbers", () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(-123)).toBe(true);
    expect(isNumeric(3.14)).toBe(true);
    expect(isNumeric(-3.14)).toBe(true);
    expect(isNumeric(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumeric(Number.MIN_SAFE_INTEGER)).toBe(true);
  });

  it("returns true for numeric strings", () => {
    expect(isNumeric("123")).toBe(true);
    expect(isNumeric("0")).toBe(true);
    expect(isNumeric("-123")).toBe(true);
    expect(isNumeric("3.14")).toBe(true);
    expect(isNumeric("-3.14")).toBe(true);
    expect(isNumeric("1e5")).toBe(true); // Scientific notation
    expect(isNumeric("-1e5")).toBe(true); // Negative scientific notation
  });

  it("returns false for non-numeric strings", () => {
    expect(isNumeric("abc")).toBe(false);
    expect(isNumeric("123abc")).toBe(false);
    expect(isNumeric("")).toBe(false); // Empty string
    expect(isNumeric(" ")).toBe(false); // Whitespace string only
  });

  it("returns false for non-string, non-number values", () => {
    expect(isNumeric(null)).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric([])).toBe(false);
    expect(isNumeric(() => {})).toBe(false);
    expect(isNumeric(true)).toBe(false);
    expect(isNumeric(false)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isNumeric(NaN)).toBe(false);
  });

  it("returns true for numeric strings with surrounding whitespace", () => {
    expect(isNumeric(" 123 ")).toBe(true);
    expect(isNumeric("   -123   ")).toBe(true);
    expect(isNumeric("\t3.14\n")).toBe(true); // Tabs and newlines
  });

  it("returns true for strings with numeric representations like scientific notation", () => {
    expect(isNumeric("1e6")).toBe(true); // Scientific notation positive
    expect(isNumeric("-1e6")).toBe(true); // Scientific notation negative
  });
});
