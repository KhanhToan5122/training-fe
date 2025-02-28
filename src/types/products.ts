import { z } from "zod";
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

export const formProductSchemas = z.object({
  name: z.string().min(1, {
    message: 'Trường này là trường bắt buộc'
  }),
  sku: z.string().min(1, {
    message: 'Trường này là trường bắt buộc'
  }),
  price: z.coerce.number().min(0),
  description: z.string().optional()
})

export type FormProductParams = z.infer<typeof formProductSchemas>
