import * as React from "react";
import FieldComponent, { SharedFieldComponentProps } from "./FieldComponent.tsx";

interface TextFieldComponentProps extends SharedFieldComponentProps {
  onChange: (value: string) => void;
  value: string | undefined;
}

const TextFieldComponent = ({
  onChange,
  value,
  label,
  errorMessage,
  type,
  placeHolder,
  disabled,
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
    />
  );
};

export default TextFieldComponent;
