import { getProductList } from "@/api/products";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/DataTable/DataTable";
import FilterContainer from "@/components/ui/DataTable/Filter/FilterContainer";
import FilterInput from "@/components/ui/DataTable/Filter/FilterInput";
import { DataTableProvider } from "@/contexts/DataTableContext";
import { ApiPaginationResponse, FilterQueryParams } from "@/types/common";
import { Products } from "@/types/products";
import { TableColumnConfigs } from "@/types/table";
import { UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import Pagination from "@/components/ui/DataTable/Pagination";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const navigate = useNavigate();

  const queryOptions = (
    filter: FilterQueryParams
  ): UseQueryOptions<ApiPaginationResponse<Products>> => {
    return {
      queryKey: ["products", filter],
      queryFn: () => getProductList(filter),
    };
  };

  const columnConfigs = useMemo<TableColumnConfigs<Products>>(
    () => [
      { id: "id", header: "ID" },
      { id: "name", header: "Name" },
      { id: "sku", header: "SKU" },
      { id: "price", header: "Price" },
      { id: "description", header: "Description" },
      {
        id: "created_at",
        header: "Created At",
        cell: ({ data }) => (
          <div>{new Date(data.created_at).toLocaleDateString()}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ data }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/products/update/${data.id}`)}
          >
            Edit
          </Button>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="bg-white p-4 rounded-md shadow">
    <DataTableProvider<ApiPaginationResponse<Products>>
      queryOptions={queryOptions}
      defaultFilter={{ page: 1, page_size: 10 }}
    >
      <div className="font-semibold text-lg text-gray-700">
        Default Example
      </div>
     
        <FilterContainer>
          <FilterInput name="query" title="Search:"/>
          {/* <Button type="submit">Submit</Button> */}
        </FilterContainer>
      
      <DataTable<Products> columns={columnConfigs} uniqueKey="id" />
      <Pagination<Products> />
    </DataTableProvider>
    </div>
  );
}

export default ProductsPage;