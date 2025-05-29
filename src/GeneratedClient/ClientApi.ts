import {store} from "../store.ts";
import {add} from "../Components/Error/BubbleSlice.ts";
import {ValidationMessage, WaitingListModelResultObject} from "./models";
import {WaitingListClient} from "./ApiControllers.ts";
import {isNotNullOrUndefined} from "../Helpers/Guard.ts";

export const AddToWaitingList = async () =>{
    const resultValue: WaitingListModelResultObject = { messages: [], records: [] };
    try {
        const response = await WaitingListClient.addPartyToWaitinglist();
        if (isNotNullOrUndefined(response.result) && response.result.messages.length > 0) {
            resultValue.messages.push(...response.result.messages);
        }
        if (isNotNullOrUndefined(response.result)) {
            resultValue.records = response.result.records;
        }
    } catch(exception) {
        const responseMessage = transformException(exception);
        handleMessages([responseMessage]);
    }

    return resultValue;
}

export const GetMetaData = async (): Promise<WaitingListModelResultObject> => {
    const resultValue: WaitingListModelResultObject = { messages: [], records: [] };
    try {
        const response = await WaitingListClient.getMetaData();
        if (isNotNullOrUndefined(response.result) && response.result.messages.length > 0) {
            resultValue.messages.push(...response.result.messages);
        }
        if (isNotNullOrUndefined(response.result)) {
            resultValue.records = response.result.records;
        }
    } catch(exception) {
        const responseMessage = transformException(exception);
        handleMessages([responseMessage]);
    }

    return resultValue;
};

const transformException = (exception: unknown): ValidationMessage => {
    let errorMessage = "An unknown error occurred, please contact support";
    if (exception instanceof Error) {
        errorMessage = exception.message;
    } else if (typeof exception === "string") {
        errorMessage = exception;
    } else if (typeof exception === "object" && exception !== null && "message" in exception) {
        errorMessage = (exception as ValidationMessage).message;
    }
    return { message: errorMessage, type: "error" };
}


const handleMessages = (messages: ValidationMessage[]): void => {
    messages?.forEach((message) => {
        store.dispatch(add(message));
    });
}