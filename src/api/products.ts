import axios from "axios";
import { API_BASE_URL } from "@/config";

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  images: string[] | null;
  created_at: string;
}

export interface ProductResponse {
  data: Product[];
  last_page: number;
}

export const getProductList = async (page: number = 1, page_size: number = 10, search: string = ""): Promise<ProductResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<ProductResponse>(
      `${API_BASE_URL}/products?page=${page}&page_size=${page_size}`, {
        params: { page, search },
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};
