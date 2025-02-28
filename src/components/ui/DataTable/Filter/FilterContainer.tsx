import { useTableDataContext } from "@/contexts/DataTableContext";
import { FilterQueryParams } from "@/types/common";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FilterContainerProps {
  children: ReactNode;
}

export default function FilterContainer({ children }: FilterContainerProps) {
  const { setFilter } = useTableDataContext();
  const form = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: FilterQueryParams) => {
    setFilter(curr => ({...curr, ...data}));
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap gap-3"
      >
        {children}
      </form>
    </FormProvider>
  );
}
