import {isNotNullOrUndefined, isNullOrUndefined} from "./Guard.ts";

type NullableString = string | null | undefined;

export const isNullOrEmpty = (value: NullableString): boolean => {
    return isNullOrUndefined(value) || value?.trim() === "";
};

export const isNotNullOrEmpty = (value: NullableString): boolean => {
    return isNotNullOrUndefined(value) && value.trim() === "";
};