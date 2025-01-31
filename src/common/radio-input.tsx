import { InputHTMLAttributes, useId } from "react";

type RadioInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "id" | "type"
> & {
  min: number | string;
  max: number | string;
  label: string;
  onChange?: (value: number) => void;
};

export const RadioInput = ({ label, onChange, ...props }: RadioInputProps) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      <span>{label}</span>
      <input
        {...props}
        id={id}
        type="range"
        onChange={(e) => onChange?.(parseInt(e.target.value))}
      />
    </label>
  );
};
