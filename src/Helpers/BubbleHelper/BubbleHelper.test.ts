import { ValidationMessage } from "../../ClientApi";
import { groupMessages } from "./BubbleHelper";

describe("groupMessages", () => {
  it("returns null if no messages are passed", () => {
    const result = groupMessages([]);
    expect(result).toBeNull();
  });

  it("returns null if the input is undefined", () => {
    const result = groupMessages(undefined as unknown as ValidationMessage[]);
    expect(result).toBeNull();
  });

  it("groups messages by their types", () => {
    const messages: ValidationMessage[] = [
      { message: "Error 1", type: "error" },
      { message: "Info 1", type: "info" },
      { message: "Error 2", type: "error" },
      { message: "Warning 1", type: "warning" },
    ];

    const result = groupMessages(messages);

    expect(result).toEqual({
      error: [
        { message: "Error 1", type: "error" },
        { message: "Error 2", type: "error" },
      ],
      info: [
        { message: "Info 1", type: "info" },
      ],
      warning: [
        { message: "Warning 1", type: "warning" },
      ],
    });
  });

  it("ignores messages with a missing or invalid type", () => {
    const messages: ValidationMessage[] = [
      { message: "Error 1", type: "error" },
      { message: "Missing type" } as unknown as ValidationMessage, // Invalid message
      { message: "Error 2", type: "error" },
    ];

    const result = groupMessages(messages);

    expect(result).toEqual({
      error: [
        { message: "Error 1", type: "error" },
        { message: "Error 2", type: "error" },
      ],
    });
  });

  it("returns an empty object if no messages have a valid type", () => {
    const messages: ValidationMessage[] = [
      { message: "No type 1" } as unknown as ValidationMessage,
      { message: "No type 2" } as unknown as ValidationMessage,
    ];

    const result = groupMessages(messages);

    expect(result).toEqual({});
  });

  it("handles a single message correctly", () => {
    const messages: ValidationMessage[] = [
      { message: "Only one message", type: "info" },
    ];

    const result = groupMessages(messages);

    expect(result).toEqual({
      info: [
        { message: "Only one message", type: "info" },
      ],
    });
  });
});