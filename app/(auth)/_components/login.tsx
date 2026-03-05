"use client";

import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginData } from "../schema";
import { handleLogin } from "@/lib/actions/auth_actions";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { checkAuth } = useAuth();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await handleLogin(data);
      await checkAuth();
      if (!response.success) {
        toast.error(response.message || "Login failed");
        return;
      }
      if (response.data.role === "admin") {
        startTransition(() => router.replace("/admin/users"));
        return;
      }
      if(response.data.role === "consumer"){
        startTransition(()=> router.replace("/consumer"));
        return;
      }
      startTransition(() => router.push("/farmer"));
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-[var(--card-bg)] shadow-2xl rounded-2xl overflow-hidden border border-[var(--border)]">
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
            <div className="flex justify-center mb-8">
              <img
                src="/images/logoName.png"
                alt="Logo"
                className="h-20 w-auto"
              />
            </div>

            <h2 className="text-3xl font-bold text-[var(--primary)] text-center mb-2">
              Welcome Back!
            </h2>
            <p className="text-center text-[var(--primary)] mb-8">
              Sign in to your account
            </p>

            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full pl-12 pr-4 py-3 border border-[var(--primary)] bg-[var(--input-bg)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition placeholder-[var(--secondary-foreground)]"
              />
            </div>
            {errors.email && (
              <p className="text-[var(--error)] text-sm mb-4">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <div className="relative mb-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full pl-12 pr-4 py-3 border border-[var(--primary)] bg-[var(--input-bg)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition placeholder-[var(--secondary-foreground)]"
              />
            </div>
            {errors.password && (
              <p className="text-[var(--error)] text-sm mb-6">
                {errors.password.message}
              </p>
            )}

            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-[var(--primary)] font-medium hover:underline hover:cursor-pointer"
                onClick={() => router.push("/request-reset-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--primary)] text-white font-bold py-3 rounded-lg hover:bg-[var(--primary-dark)] transition duration-200 shadow-md"
            >
              Sign In to Your Account
            </button>

            <div className="text-center mt-8">
              <button
                type="button"
                className="text-[var(--primary)] font-semibold hover:underline hover:cursor-pointer"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Create new Account
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-[var(--primary)]  hover:underline hover:cursor-pointer"
                onClick={() => {
                  router.push("/FarmerRegister");
                }}
              >
                Become a Farmer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
