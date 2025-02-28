import { ReactNode } from "react";

export type TableColumnConfig<DataType> = {
  id: string;
  header:
    | string
    | (() => ReactNode);
  cell?: ({ data, index }: { data: DataType; index: number }) => ReactNode;
};

export type TableColumnConfigs<DataType> = TableColumnConfig<DataType>[];
