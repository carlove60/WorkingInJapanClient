import { isNotNullOrEmpty, isNullOrEmpty } from "./StringHelper";

describe("isNullOrEmpty", () => {
  it("returns true for null", () => {
    expect(isNullOrEmpty(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isNullOrEmpty(undefined)).toBe(true);
  });

  it("returns true for an empty string", () => {
    expect(isNullOrEmpty("")).toBe(true);
  });

  it("returns true for a string with only whitespace", () => {
    expect(isNullOrEmpty("   ")).toBe(true);
  });

  it("returns false for a non-empty string", () => {
    expect(isNullOrEmpty("hello")).toBe(false);
  });

  it("returns false for a string with surrounding whitespace but not empty", () => {
    expect(isNullOrEmpty("  hello  ")).toBe(false);
  });
});

describe("isNotNullOrEmpty", () => {
  it("returns false for null", () => {
    expect(isNotNullOrEmpty(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isNotNullOrEmpty(undefined)).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isNotNullOrEmpty("")).toBe(false);
  });

  it("returns false for a string with only whitespace", () => {
    expect(isNotNullOrEmpty("   ")).toBe(false);
  });

  it("returns true for a non-empty string", () => {
    expect(isNotNullOrEmpty("hello")).toBe(true);
  });

  it("returns true for a string with surrounding whitespace but not empty", () => {
    expect(isNotNullOrEmpty("  hello  ")).toBe(true);
  });
});
