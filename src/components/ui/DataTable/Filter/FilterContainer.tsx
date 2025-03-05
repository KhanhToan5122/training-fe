import { useTableDataContext } from "@/contexts/DataTableContext";
import { FilterQueryParams } from "@/types/common";
import { ReactNode, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FilterContainerProps {
  children: ReactNode;
}

export default function FilterContainer({ children }: FilterContainerProps) {
  const { setFilter } = useTableDataContext();
  const form = useForm<FilterQueryParams>({
    mode: "onChange",
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const { watch } = form;
  const formValues = watch();
  const prevValuesRef = useRef<FilterQueryParams | null>(null); // Lưu giá trị trước đó

  useEffect(() => {
    // So sánh giá trị hiện tại với giá trị trước đó
    if (
      JSON.stringify(formValues) !== JSON.stringify(prevValuesRef.current)
    ) {
      setFilter((curr) => ({ ...curr, ...formValues }));
      prevValuesRef.current = formValues; // Cập nhật giá trị trước đó
    }
  }, [formValues, setFilter]);

  return (
    <FormProvider {...form}>
      <form className="flex justify-end mb-3 gap-3">{children}</form>
    </FormProvider>
  );
}