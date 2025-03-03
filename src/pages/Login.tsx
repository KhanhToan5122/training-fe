import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, loginSchema } from "@/validations/loginSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import googlePlusIcon from '@/assets/google-plus-icon.png';
import twitterPlusIcon from '@/assets/twitter-plus-icon.png';
import facebookPlusIcon from '@/assets/facebook-plus-icon.png';
import uploaduplon from '@/assets/uploaduplon.png';
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-[400px] border border-gray-200"
      >
        <div className="flex justify-center mb-4">
          <img src={uploaduplon} alt="Uplon Logo" className="h-8 w-auto" />
        </div>
        <h2 className="text-muted text-uppercase py-3 font-16">SIGN IN</h2>
        <div className="mb-4">
          <Input
            {...register("username")}
            placeholder="Enter your username"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="mr-2"
            // {...register("remember")}
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>
        {loginError && <p className="text-red-500 text-sm mb-4">{loginError.message}</p>}
        <Button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
          disabled={loginLoading}
        >
          {loginLoading ? "Logging in..." : "Log In"}
        </Button>
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
            Forgot your password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Sign in with</p>
          <div className="flex justify-center gap-2">
            <Button className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800">
              <img src={facebookPlusIcon} alt="Facebook" className="h-4 w-4 mr-2" /> Facebook
            </Button>
            <Button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500">
              <img src={twitterPlusIcon} alt="Twitter" className="h-4 w-4 mr-2" /> Twitter
            </Button>
            <Button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
              <img src={googlePlusIcon} alt="Google+" className="h-4 w-4 mr-2" /> Google+
            </Button>
          </div>
        </div>
        
      </form>
      <div className="text-center items-center justify-center mt-4 text-sm text-gray-600">
          Don’t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
      </div>
    </div>
  );
}