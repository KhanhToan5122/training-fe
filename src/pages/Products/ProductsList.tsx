import { useProducts } from "@/contexts/ProductContext";
import { useProductTable } from "@/contexts/ProductTableContext";
import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function ProductsList() {
    const { products, isLoading, last_page, pageSize, setPageSize } = useProducts();
    const { page, setPage, search, setSearch } = useProductTable();
    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
        setSearch(searchInput);
        setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput, setSearch, setPage]);
    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = Math.min(page * pageSize, last_page * pageSize); 

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Product List</h2>

        {/* Header controls (Dropdown + Search) */}
        <div className="mb-4 flex items-center justify-between">
            {/* Select pagination */}
            <div className="flex items-center space-x-2">
            <label className="font-medium text-gray-600">Entries per page:</label>
            <select
                value={pageSize}
                onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1); // Reset về trang 1 khi thay đổi pageSize
                }}
                className="p-2 border rounded text-gray-700"
            >
                {[10, 15, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                    {size}
                </option>
                ))}
            </select>
            </div>

            {/* Search Bar */}
            <div className="flex space-x-2">
            <Input
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border p-2 rounded"
            />
            <Button onClick={() => setPage(1)}>Search</Button>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <Table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left font-semibold border-r">ID</th>
                <th className="px-4 py-3 text-left font-semibold border-r">Name</th>
                <th className="px-4 py-3 text-left font-semibold border-r">SKU</th>
                <th className="px-4 py-3 text-left font-semibold border-r">Price</th>
                <th className="px-4 py-3 text-left font-semibold border-r">Images</th>
                <th className="px-4 py-3 text-left font-semibold">Created At</th>
                </tr>
            </thead>

            <TableBody>
                {isLoading ? (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                    Loading...
                    </TableCell>
                </TableRow>
                ) : (
                products.map((product) => (
                    <TableRow key={product.id} className="border-b hover:bg-gray-50">
                    <TableCell className="px-4 py-3 border-r">{product.id}</TableCell>
                    <TableCell className="px-4 py-3 border-r">{product.name}</TableCell>
                    <TableCell className="px-4 py-3 border-r">{product.sku}</TableCell>
                    <TableCell className="px-4 py-3 border-r">${product.price}</TableCell>
                    <TableCell className="px-4 py-3 border-r">
                        {product.images?.length ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded border"
                        />
                        ) : (
                        "No Image"
                        )}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                        {new Date(product.created_at).toLocaleDateString()}
                    </TableCell>
                    </TableRow>
                ))
                )}
            </TableBody>
            </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600">
            Showing {startIndex} to {endIndex} of {last_page * pageSize} entries
        </span>


            <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious
                    className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    onClick={() => setPage(Math.max(page - 1, 1))}
                />
                </PaginationItem>

                {[...Array(last_page)].map((_, index) => {
                const pageNum = index + 1;
                return (
                    <PaginationItem key={pageNum}>
                    <PaginationLink
                        isActive={page === pageNum}
                        onClick={() => setPage(pageNum)}
                    >
                        {pageNum}
                    </PaginationLink>
                    </PaginationItem>
                );
                })}

                <PaginationItem>
                <PaginationNext
                    className={page === last_page ? "opacity-50 cursor-not-allowed" : ""}
                    onClick={() => setPage(Math.min(page + 1, last_page))}
                />
                </PaginationItem>
            </PaginationContent>
            </Pagination>
        </div>
        </div>
    );
}
