import * as React from "react";
import FieldComponent, { SharedFieldComponentProps } from "../FieldComponent/FieldComponent.tsx";
import { SxProps, Theme } from "@mui/material";

interface TextFieldComponentProps extends SharedFieldComponentProps {
  onChange: (value: string) => void;
  value: string | undefined;
  sx: SxProps<Theme>;
}

const TextFieldComponent = ({
  onChange,
  value,
  label,
  errorMessage,
  type,
  placeHolder,
  disabled,
  sx,
}: TextFieldComponentProps) => {
  const onContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <FieldComponent
      onChange={onContentChange}
      placeHolder={placeHolder}
      value={value}
      label={label}
      errorMessage={errorMessage}
      type={type}
      disabled={disabled}
      sx={sx}
    />
  );
};

export default TextFieldComponent;
