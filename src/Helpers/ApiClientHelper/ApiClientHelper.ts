import { ValidationMessage } from "../../ClientApi";
import { store } from "../../store.ts";
import { add } from "../../Components/BubbleComponent/BubbleSlice.ts";

type ResponseWithBodyError = {
  response: Response;
  message: string;
  name: string;
};
function isResponseError(error: unknown): error is ResponseWithBodyError {
  return error !== undefined && error !== null && typeof error === "object" && "response" in error;
}

export const transformException = async (exception: unknown): Promise<ValidationMessage> => {
  let errorMessage = "An unknown error occurred, please contact support";
  if (isResponseError(exception)) {
    const text = await exception.response.text();
    try {
      const body = JSON.parse(text);
      if (body.errors) {
        errorMessage = JSON.stringify(body.errors);
      }
    } catch {
      errorMessage = "Something went wrong posting your request to the server.";
    }
  } else if (exception instanceof Error) {
    errorMessage = exception.message;
  } else if (typeof exception === "string") {
    errorMessage = exception;
  } else if (typeof exception === "object" && exception !== null && "message" in exception) {
    errorMessage = (exception as ValidationMessage).message;
  }
  return { message: errorMessage, type: "error" };
};

export const handleMessages = (messages: ValidationMessage[]): void => {
  messages?.forEach((message) => {
    store.dispatch(add(message));
  });
};
