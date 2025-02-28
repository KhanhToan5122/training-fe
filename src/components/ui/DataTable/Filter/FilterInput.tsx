import { InputHTMLAttributes } from "react";
import { Controller } from "react-hook-form";

export interface FilterInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  name: string;
  title?: string;
}

export default function FilterInput({
  name,
  title,
  ...inputProps
}: FilterInputProps) {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange } }) => (
        <label>
          {title && <span>{title}</span>}
          <input
            type="text"
            name={name}
            {...inputProps}
            value={value}
            onChange={onChange}
          />
        </label>
      )}
    />
  );
}
