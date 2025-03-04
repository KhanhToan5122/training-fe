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
import '@mdi/font/css/materialdesignicons.min.css';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-customBlue">
      <div className="w-[516px] h-[539px] bg-gray-100 rounded-md rounded-2 p-2">
        <div className="mb-0 rounded-md border-4 border-customBlue">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[492px] h-[515px] bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex justify-center mb-4">
          <img src={uploaduplon} alt="Uplon Logo" className="h-8 w-auto" />
        </div>
        <h2 className="text-gray-500/60 font-bold text-center py-3 font-16">SIGN IN</h2>
        <div className="mb-4 relative">
          <Input
            {...register("username")}
            placeholder="Enter your username"
            className="w-full p-2 placeholder:text-sm"
          />
          {errors.username && (
            <div className="absolute top-[125%] left-[20%] flex flex-col items-center">
            {/* Mũi tên */}
            <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black"></div>

            <div className="w-0 h-0 border-l-7 border-r-7 border-b-7 border-l-transparent border-r-transparent -mt-[1px]"></div>
      
            {/* Hộp thông báo lỗi */}
            <div className="h-[100%] flex items-center bg-[#ffffff] border border-black rounded-sm text-black text-sm p-2 shadow-md z-50">
              <div className="bg-orange-500 text-white rounded-sm w-5 h-5 flex items-center justify-center mr-2 text-xs font-bold">
                !
              </div>
              {errors.username.message}
            </div>
          </div>
          )}
        </div>
        <div className="mb-4 relative">
          <Input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-md placeholder:text-sm"
          />
          {!errors.username && errors.password && (
          <div className="absolute top-[125%] left-[20%] flex flex-col items-center">
            {/* Mũi tên */}
            <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black"></div>

            <div className="w-0 h-0 border-l-7 border-r-7 border-b-7 border-l-transparent border-r-transparent -mt-[1px]"></div>
      
            {/* Hộp thông báo lỗi */}
            <div className="h-[100%] flex items-center bg-[#ffffff] border border-black rounded-sm text-black text-sm p-2 shadow-md z-50">
              <div className="bg-orange-500 text-white rounded-sm w-5 h-5 flex items-center justify-center mr-2 text-xs font-bold">
                !
              </div>
              {errors.password.message}
            </div>
          </div>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="mr-2"
            // {...register("remember")}
          />
          <label htmlFor="remember" className="text-sm font-semibold text-gray-600">
            Remember me
          </label>
        </div>
        {loginError && <p className="text-red-500 text-sm mb-4">{loginError.message}</p>}
        <Button
          type="submit"
          className="w-full bg-customGreen text-white p-2 rounded-md"
          disabled={loginLoading}
        >
          {loginLoading ? "Logging in..." : "Log In"}
        </Button>
        <div className="mt-4">
          <a href="/forgot-password" className="text-gray-500/60 font-semibold text-sm hover:underline">
            <i className="mdi mdi-lock me-1"></i>
            Forgot your password?
          </a>
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-500/60 font-bold mb-6">Sign in with</p>
          <div className="flex justify-center gap-1">
            <Button className="bg-customFacebook text-white p-2 rounded-md">
              <img src={facebookPlusIcon} alt="Facebook" className="h-5 w-5 mr-1" /> Facebook
            </Button>
            <Button className="bg-customTwitter text-white p-2 rounded-md">
              <img src={twitterPlusIcon} alt="Twitter" className="h-6 w-7 opacity-90 mr-1" /> Twitter
            </Button>
            <Button className="bg-customGoogle text-white p-2 rounded-md">
              <img src={googlePlusIcon} alt="Google+" className="h-8 w-8 mr-1" /> Google+
            </Button>
          </div>
        </div>
        
      </form>
      
      </div>
      </div>
      <div className="text-center items-center justify-center mt-4 text-sm font-semibold text-gray-200/70">
          Don’t have an account? <a href="/signup" className="text-white font-bold hover:underline">Sign Up</a>
      </div>
    </div>
  );
}