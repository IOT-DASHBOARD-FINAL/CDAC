import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card1";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="flex -mt-16 justify-center items-center min-h-screen bg-gradient-to-tr from-custom-cornflowerBlue to-custom-deepBlue p-4">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl md:text-3xl lg:text-3xl text-custom-deepBlue pt-3">Login to the Application</CardTitle>
          <CardDescription className="text-custom-deepBlue text-lg md:text-xl lg:text-xl font-medium flex justify-center">Let's enter into IOT world</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="loginForm" className="text-custom-deepBlue" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2">E-Mail Id</Label>
              <Input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your College Email"
              />
              {errors.email && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.email.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 md:pr-5 flex items-center text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.password.message}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mb-4">
        <Button type="submit" form="loginForm" className="w-full md:w-72 lg:w-96 bg-custom-softBlue text-white hover:bg-custom-deepBlue md:text-lg flex justify-center items-center">
            {loading ? <PulseLoader color="#FFFFFF" loading={loading} radius={2} margin={2} /> : 'Login'}
          </Button>
          <Button
            className="w-full md:w-72 lg:w-96 bg-custom-softBlue text-white hover:bg-custom-deepBlue md:text-lg"
            onClick={() => navigate('/register')}
          >Register</Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default Login;