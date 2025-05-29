export const isNumeric = (value: unknown): value is number => {
    if (typeof value !== "string") {
        return false;
    }

    return !isNaN(Number(value.trim())) &&
        !isNaN(parseFloat(value.trim()));
}