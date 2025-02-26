import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, loginSchema } from "@/validations/loginSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, login, loginError, loginLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    login(data);
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">SIGN IN</h2>
        <div className="mb-4">
          <Input {...register("username")} placeholder="Enter your username" />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Input {...register("password")} type="password" placeholder="Enter your password" />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {loginError && <p className="text-red-500 text-sm mb-4">{loginError.message}</p>}
        <Button type="submit" className="w-full" disabled={loginLoading}>
          {loginLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}
