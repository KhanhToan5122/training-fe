import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input, InputProps } from "../input";

interface FormInputControlProps extends Omit<InputProps, 'value' | 'onChange'>  {
  label?: string;
  isRequired?: boolean;
  name: string;
}

function FormInputControl({ label, isRequired, name, ...inputProps }: FormInputControlProps) {
  return (
    <FormField
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder="shadcn"
              value={value || ""}
              onChange={onChange}
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormInputControl;
