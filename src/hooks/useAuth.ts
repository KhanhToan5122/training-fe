import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "@/api/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<{ username: string; name: string } | null>(null);

  // Kiểm tra token ngay lập tức khi component render
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mutation login
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify({ username: data.data.username, name: data.data.name }));
        setUser({ username: data.data.username, name: data.data.name });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });

  // Mutation logout
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login", { replace: true });
    },
  });

  return {
    user,
    isLoading: loginMutation.isPending,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    loginError: loginMutation.error,
    loginLoading: loginMutation.isPending,
  };
};
