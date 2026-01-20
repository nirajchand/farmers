'use client';

import { Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterData } from "../schema";
import {useState, useTransition } from "react";
import { handleRegister } from "@/lib/actions/auth_actions";
import { useRouter } from "next/navigation";

export default function Register() {

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try{
      const response = await handleRegister(data);
      if(!response.success){
        throw new Error(response.message)
      }
      startTransition(()=> router.push("/login"))
    }catch(err: Error | any){
      setError(err.message || "Registration Failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">

        <div className="md:w-1/2">
          <img
            src="/images/vegetable.jpg"
            alt="Fresh Vegetables"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto w-full"
          >
            <div className="flex justify-center mb-3">
              <img
                src="/images/logoName.png"
                alt="Logo"
                className="h-26 w-auto"
              />
            </div>

            <h2 className="text-3xl font-bold text-[#15A305] text-center mb-2">
              Join Our Community
            </h2>
            <p className="text-center text-[#15A305] font-semibold mb-3">
              Create your account
            </p>

            <div className="relative mb-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-[#15A305]" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                className="w-full pl-12 pr-4 py-3 border border-[#15A305] rounded-lg"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mb-3">
                {errors.fullName.message}
              </p>
            )}

            <div className="relative mb-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-[#15A305]" />
              </div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full pl-12 pr-4 py-3 border border-[#15A305] rounded-lg"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mb-3">
                {errors.email.message}
              </p>
            )}

            <div className="relative mb-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-[#15A305]" />
              </div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full pl-12 pr-4 py-3 border border-[#15A305] rounded-lg"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mb-3">
                {errors.password.message}
              </p>
            )}

            <div className="relative mb-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-[#15A305]" />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full pl-12 pr-4 py-3 border border-[#15A305] rounded-lg"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mb-5">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#15A305] text-white font-bold py-3 rounded-lg hover:bg-[#128d04] transition duration-200 shadow-md"
            >
              Create Account
            </button>

            <div className="text-center mt-8">
              <button
                type="button"
                className="text-[#15A305] font-semibold hover:underline"
              >
                Already have an account? Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
