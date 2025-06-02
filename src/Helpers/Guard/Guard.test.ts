import { isNotNullOrUndefined, isNullOrUndefined } from "./Guard.ts";

describe("isNullOrUndefined", () => {
  it("returns true for null", () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it("returns true for explicitly undefined", () => {
    expect(isNullOrUndefined((() => {})())).toBe(true); // A function with no return value returns undefined
  });

  it("returns false for a non-null, non-undefined value", () => {
    expect(isNullOrUndefined("not null or undefined")).toBe(false);
    expect(isNullOrUndefined(123)).toBe(false);
    expect(isNullOrUndefined(false)).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
  });
});

describe("isNotNullOrUndefined", () => {
  it("returns false for null", () => {
    expect(isNotNullOrUndefined(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isNotNullOrUndefined(undefined)).toBe(false);
  });

  it("returns false for explicitly undefined values", () => {
    expect(isNotNullOrUndefined((() => {})())).toBe(false); // A function with no return value
  });

  it("returns true for a non-null, non-undefined value", () => {
    expect(isNotNullOrUndefined("not null or undefined")).toBe(true);
    expect(isNotNullOrUndefined(123)).toBe(true);
    expect(isNotNullOrUndefined(false)).toBe(true);
    expect(isNotNullOrUndefined({})).toBe(true);
    expect(isNotNullOrUndefined([])).toBe(true);
    expect(isNotNullOrUndefined(() => {})).toBe(true); // Functions are valid values
  });
});
