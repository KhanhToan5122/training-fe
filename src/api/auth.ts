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

// export const getUser = async (): Promise<User> => {
//   const response = await fetch("http://training.mumesoft.com/api/user", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch user data");
//   }

//   return response.json();
// };

export const logout = async () => {
  localStorage.removeItem("token");
};
