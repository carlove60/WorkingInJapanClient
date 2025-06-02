import { ValidationMessage } from "../../ClientApi";
import { transformException } from "./ApiClientHelper";

describe("transformException", () => {
  it("returns a default error message for unknown exceptions", async () => {
    const result = await transformException(null);
    expect(result).toEqual({
      message: "An unknown error occurred, please contact support",
      type: "error",
    });
  });

  it("returns the exception message if it is an Error object", async () => {
    const exception = new Error("This is an error message");
    const result = await transformException(exception);
    expect(result).toEqual({
      message: "This is an error message",
      type: "error",
    });
  });

  it("returns the exception message if it is a string", async () => {
    const exception = "A string error message";
    const result = await transformException(exception);
    expect(result).toEqual({
      message: "A string error message",
      type: "error",
    });
  });

  it("handles a ResponseWithBodyError and parses the error body", async () => {
    const exception = {
      response: {
        text: async () => JSON.stringify({ errors: ["Error 1", "Error 2"] }),
      },
      message: "Response error",
      name: "ResponseError",
    };

    const result = await transformException(exception);
    expect(result).toEqual({
      message: '["Error 1","Error 2"]',
      type: "error",
    });
  });

  it("handles a ResponseWithBodyError and defaults to a server error message", async () => {
    const exception = {
      response: {
        text: async () => "Invalid JSON",
      },
      message: "Response error",
      name: "ResponseError",
    };

    const result = await transformException(exception);
    expect(result).toEqual({
      message: "Something went wrong posting your request to the server.",
      type: "error",
    });
  });

  it("returns a default message for an unknown object with no message property", async () => {
    const exception = { someProperty: "someValue" };
    const result = await transformException(exception);
    expect(result).toEqual({
      message: "An unknown error occurred, please contact support",
      type: "error",
    });
  });

  it("handles ValidationMessage-like objects gracefully", async () => {
    const exception: ValidationMessage = { message: "Validation issue", type: "error" };
    const result = await transformException(exception);
    expect(result).toEqual({
      message: "Validation issue",
      type: "error",
    });
  });
});