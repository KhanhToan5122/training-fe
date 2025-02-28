import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "../button";

export interface FormContainerProps<FormState> {
  schemas: ZodType;
  initValues?: FormState;
  onSubmit: (data: FormState) => void;
  onBack?: () => void;
  isPending?: boolean;
  children: ReactNode;
}

function FormContainer<FormState>({
  onSubmit,
  schemas,
  initValues,
  isPending,
  children,
  onBack,
}: FormContainerProps<FormState>) {
  const forms = useForm({
    resolver: zodResolver(schemas),
    mode: "onChange",
  });

  useEffect(() => {
    if (initValues) forms.reset(initValues);
  }, [initValues]);
  return (
    <FormProvider {...forms}>
      <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
        {children}

        <div className="flex items-center">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
          {onBack && (
            <Button type="button" disabled={isPending}>
              Back
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default FormContainer;
