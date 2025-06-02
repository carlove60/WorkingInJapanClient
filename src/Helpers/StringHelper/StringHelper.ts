import { isNotNullOrUndefined, isNullOrUndefined } from "../Guard/Guard.ts";

type NullableString = string | null | undefined;

export const isString = (value: unknown): value is string => {
  return value instanceof String;
};
export const isNullOrEmpty = (value: NullableString): boolean => {
  return isNullOrUndefined(value) || value?.trim() === "";
};

export const isNotNullOrEmpty = (value: NullableString): boolean => {
  return isNotNullOrUndefined(value) && value.trim() !== "";
};
