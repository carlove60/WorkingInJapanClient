import * as React from "react";
import FieldComponent, { SharedFieldComponentProps } from "../FieldComponent/FieldComponent.tsx";
import { SxProps, Theme } from "@mui/material";

interface NumberFieldComponentProps extends SharedFieldComponentProps {
  onChange: (value: number) => void;
  value: number | undefined;
  sx: SxProps<Theme>;
}

const NumberFieldComponent = ({
  onChange,
  value,
  label,
  errorMessage,
  type,
  placeHolder,
  disabled,
  sx,
}: NumberFieldComponentProps) => {
  const onContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.valueAsNumber);
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

export default NumberFieldComponent;
