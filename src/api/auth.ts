import axios from "axios";
import { API_BASE_URL } from "@/config";

export interface AuthResponse {
  data: {
    token: string;
    username: string;
    name: string;
  };
  status: boolean;
  msg: string;
}

export const login = async (data: { username: string; password: string }): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/login`,
    data,
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};


export interface User {
  id: number;
  username: string;
  email: string;
}

export const logout = async () => {
  localStorage.removeItem("token");
};
