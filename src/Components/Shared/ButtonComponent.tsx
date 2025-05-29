import * as React from "react";
import {isNotNullOrUndefined} from "../../Helpers/Guard.ts";
import {Button} from "@mui/material";

interface buttonProps {
    text: string;
    onPress: () => void;
}
const buttonComponent: React.FunctionComponent<buttonProps> = ({ onPress, text }: buttonProps) => {
    const onClick = (): void => {
        if (isNotNullOrUndefined(onPress)) {
            onPress();
        }
    };

    return <Button onClick={onClick}>{text}</Button>
}

export default buttonComponent;