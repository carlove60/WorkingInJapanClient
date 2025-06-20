import * as React from "react";
import { SxProps, TextField, Theme } from "@mui/material";
import { isNotNullOrUndefined } from "../../../Helpers/Guard/Guard.ts";

export interface FieldComponentProps extends SharedFieldComponentProps {
  value: string | number | null | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

export interface SharedFieldComponentProps {
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeHolder: string;
  errorMessage: string;
  disabled: boolean;
  sx: SxProps<Theme>;
}

const FieldComponent = ({
  type,
  label,
  value,
  onChange,
  errorMessage,
  placeHolder,
  disabled,
  sx,
}: FieldComponentProps) => {
  const onContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (isNotNullOrUndefined(onChange)) {
      onChange(event);
    }
  };

  return (
    <TextField
      error={errorMessage !== undefined}
      placeholder={placeHolder}
      aria-label={label}
      helperText={errorMessage}
      required={true}
      variant={"outlined"}
      type={type}
      id={`Field-${label}`}
      label={label}
      style={{ margin: "10px" }}
      onChange={onContentChange}
      value={value}
      disabled={disabled}
      sx={sx}
    />
  );
};

export default FieldComponent;
