import { useTableDataContext } from "@/contexts/DataTableContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { ApiPaginationResponse } from "@/types/common";
import { TableColumnConfigs } from "@/types/table";
import { ReactNode } from "react";

interface DataTableProps<DataType> {
  columns: TableColumnConfigs<DataType>;
  uniqueKey: keyof DataType | ((data: DataType) => string);
}

function DataTable<TableData>({
  columns,
  uniqueKey,
}: DataTableProps<TableData>) {
  const { data, isLoading, filter, setFilter } =
    useTableDataContext<ApiPaginationResponse<TableData>>();

  return (
    <Table className="w-full border-collapse border border-gray-300 table-fixed">
      <TableHeader>
        <TableRow>
          {columns.map((column, colIndex) => (
            <TableHead
              key={column.id}
              className={colIndex > 2 ? "hidden md:table-cell" : "table-cell"}
            >
              {typeof column.header === "string"
                ? column.header
                : column.header()}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading && data && data.data.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              No results found
            </TableCell>
          </TableRow>
        )}

        {data?.data.length &&
          data.data.map((item, index) => (
            <TableRow
              key={
                typeof uniqueKey === "function"
                  ? uniqueKey(item)
                  : (item[uniqueKey] as string)
              }
              className="border-b hover:bg-gray-50"
            >
              {columns.map((column, colIndex) => (
                <TableCell key={column.id}
                className={`w-[150px] border-r ${
                  colIndex > 2 ? "hidden md:table-cell" : "table-cell"
                }`}>
                  {column.cell
                    ? column.cell({ data: item, index })
                    : (item?.[column.id as keyof TableData] as ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
