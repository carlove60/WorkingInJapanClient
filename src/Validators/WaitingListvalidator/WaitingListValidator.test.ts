import { validatePartySize } from "./WaitingListValidator";

describe("validatePartySize", () => {
  it("returns a validation message when party size exceeds total seats available", () => {
    const result = validatePartySize(10, 5);

    expect(result).toEqual({
      message: "Your party size of 10 is larger than the total of 5 seats available",
      type: "error",
    });
  });

  it("returns undefined when party size equals total seats available", () => {
    const result = validatePartySize(5, 5);
    expect(result).toBeUndefined();
  });

  it("returns undefined when party size is less than total seats available", () => {
    const result = validatePartySize(3, 5);
    expect(result).toBeUndefined();
  });

  it("returns undefined when party size is undefined", () => {
    const result = validatePartySize(undefined, 5);
    expect(result).toBeUndefined();
  });

  it("returns undefined when party size is not numeric", () => {
    const result = validatePartySize(NaN, 5);
    expect(result).toBeUndefined();
  });
});