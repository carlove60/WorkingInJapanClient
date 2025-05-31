import * as React from "react";
import FieldComponent, { SharedFieldComponentProps } from "./FieldComponent.tsx";

interface NumberFieldComponentProps extends SharedFieldComponentProps {
  onChange: (value: number) => void;
  value: number | undefined;
}

const NumberFieldComponent = ({
  onChange,
  value,
  label,
  errorMessage,
  type,
  placeHolder,
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
    />
  );
};

export default NumberFieldComponent;
