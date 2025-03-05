import { Button } from "@/components/ui/button";
import { useTableDataContext } from "@/contexts/DataTableContext";
import { ApiPaginationResponse } from "@/types/common";
import { useMemo } from "react";

interface PaginationProps {
  onItemChange?: (item: number) => void;
}

export default function Pagination<DataType>({ onItemChange }: PaginationProps) {
  const { data, filter, setFilter } = useTableDataContext<ApiPaginationResponse<DataType>>();
  
  const currentItem = Number(filter.page) || 1;
  const lastItem = data?.last_page || 1;

  const itemNumbers = useMemo(() => {
    const items = [];
    const maxItemsToShow = 5;
    let startItem = Math.max(1, currentItem - Math.floor(maxItemsToShow / 2));
    let endItem = startItem + maxItemsToShow - 1;

    if (endItem > lastItem) {
      endItem = lastItem;
      startItem = Math.max(1, endItem - maxItemsToShow + 1);
    }

    for (let i = startItem; i <= endItem; i++) {
      items.push(i);
    }
    return items;
  }, [currentItem, lastItem]);

  const handleItemChange = (item: number) => {
    setFilter((prev) => ({ ...prev, page: item }));
    onItemChange?.(item);
  };

  if (!data || lastItem <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 mt-4">
      <div className="ml-4 text-sm text-gray-600">
        Showing {currentItem} to {lastItem} of {data?.total || 0} entries
      </div>
      <div className="flex gap-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleItemChange(currentItem - 1)}
          disabled={currentItem === 1}
        >
          Previous
        </Button>

        {itemNumbers.map((item) => (
          <Button
            key={item}
            variant={currentItem === item ? "default" : "outline"}
            size="sm"
            onClick={() => handleItemChange(item)}
          >
            {item}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleItemChange(currentItem + 1)}
          disabled={currentItem === lastItem}
        >
          Next
        </Button>
      </div>
    </div>
  );
}