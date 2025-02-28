import { IntergerBoolean } from "./common";

export interface Products {
  id: number;
  name: string;
  sku: string;
  price: number;
  images: string[] | null;
  status: boolean;
  description: string;
  is_active: 0 | 1;
  category_ids: null;
  created_by: {
    id: number;
    text: number;
  };
  created_at: string;
}
