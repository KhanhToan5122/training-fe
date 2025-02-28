import { FilterQueryParams } from "@/types/common";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

export interface DataTableContextValues<DataType> {
  data?: DataType;
  isLoading: boolean
  refetch: () => Promise<void>
  filter: FilterQueryParams
  setFilter: Dispatch<SetStateAction<FilterQueryParams>>
}

export interface DataTableProviderProps<DataType> {
  children: ReactNode;
  queryOptions: (filter: FilterQueryParams) => UseQueryOptions<DataType>;
  defaultFilter?: FilterQueryParams
}

const DataTableContext = createContext<DataTableContextValues<any> | undefined>(
  undefined
);

export function useTableDataContext<DataType>() {
  const data = useContext<DataTableContextValues<DataType> | undefined>(
    DataTableContext
  );
  if (data === undefined) {
    throw new Error("Error");
  }
  return data;
}

export function DataTableProvider<DataType>({
  children,
  queryOptions,
  defaultFilter
}: DataTableProviderProps<DataType>) {
  const [filter, setFilter] = useState<FilterQueryParams>(defaultFilter || {});
  const { data, refetch, isLoading, isRefetching } = useQuery(queryOptions(filter));

  const handleRefresh = async () => {
    await refetch()
  }

  const values = useMemo<DataTableContextValues<DataType>>(
    () => ({
      data,
      isLoading: isLoading || isRefetching,
      refetch: handleRefresh,
      filter,
      setFilter
    }),
    [filter, data, isLoading, isRefetching]
  );

  return (
    <DataTableContext.Provider value={values}>
      {children}
    </DataTableContext.Provider>
  );
}
