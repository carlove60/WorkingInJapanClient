import * as React from "react";
import { isNotNullOrUndefined } from "../../../Helpers/Guard/Guard.ts";
import { Button } from "@mui/material";

interface buttonProps {
  text: string;
  onPress: () => void;
  disabled: boolean | undefined;
}
const buttonComponent: React.FunctionComponent<buttonProps> = ({ onPress, text, disabled }: buttonProps) => {
  const onClick = (): void => {
    if (isNotNullOrUndefined(onPress)) {
      onPress();
    }
  };

  return (
    <Button disabled={disabled} onClick={onClick}>
      {text}
    </Button>
  );
};

export default buttonComponent;
