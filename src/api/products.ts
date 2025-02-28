// @/api/products.ts
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { ApiPaginationResponse, ApiSingleResponse, FilterQueryParams } from "@/types/common";
import { Products } from "@/types/products";

export const getProductList = async (filter?: FilterQueryParams): Promise<ApiPaginationResponse<Products>> => {
  try {
    const queryString = filter && Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&');
    const token = localStorage.getItem("token");
    const response = await axios.get<ApiPaginationResponse<Products>>(
      `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`,
      {
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

export const createProduct = async (formData: FormData): Promise<Products> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post<Products>(
      `${API_BASE_URL}/products`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": "XlPNe4S4UC5zuS9lJFuAMmsH3FZe4brPfET3bfDI", // Replace with dynamic token in production
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};

export const updateProduct = async (id: string, formData: FormData): Promise<Products> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put<Products>(
      `${API_BASE_URL}/products/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": "XlPNe4S4UC5zuS9lJFuAMmsH3FZe4brPfET3bfDI", 
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}`, error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Products> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<ApiSingleResponse<Products>>(
      `${API_BASE_URL}/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}`, error);
    throw error;
  }
};