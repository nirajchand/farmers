"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleResetPassword } from "@/lib/actions/auth_actions";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDTO>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordDTO) => {
    console.log("onSubmit called with data:", data);

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    try {
      console.log("Calling handleResetPassword with token:", token);
      const response = await handleResetPassword(token, data.password);
      console.log("Response:", response);

      if (response.success) {
        toast.success("Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(response.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] px-4">
        <div className="w-full max-w-md bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 border border-[var(--border)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--error)]">
              Invalid Reset Link
            </h2>
            <p className="text-sm text-[var(--secondary-foreground)] mt-2">
              This password reset link is invalid or has expired.
            </p>
            <Link
              href="/request-password-reset"
              className="inline-block mt-4 text-[var(--info)] font-medium hover:underline"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)] px-4">
      <div className="w-full max-w-md bg-[var(--card-bg)] shadow-lg rounded-2xl p-8 border border-[var(--border)]">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Reset Password</h2>
          <p className="text-sm text-[var(--secondary-foreground)] mt-2">
            Enter a new password to regain access to your account.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-5"
        >
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              autoComplete="new-password"
              {...register("password")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition bg-[var(--input-bg)] text-[var(--foreground)] ${
                errors.password ? "border-[var(--error)]" : "border-[var(--border)]"
              }`}
            />
            {errors.password && (
              <p className="text-[var(--error)] text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition bg-[var(--input-bg)] text-[var(--foreground)] ${
                errors.confirmPassword ? "border-[var(--error)]" : "border-[var(--border)]"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-[var(--error)] text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 rounded-lg text-white font-medium transition-colors ${
              isSubmitting
                ? "bg-[var(--info)] cursor-not-allowed opacity-75"
                : "bg-[var(--info)] hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>

          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-between text-sm text-[var(--secondary-foreground)] mt-2 gap-2">
            <Link
              href="/login"
              className="text-[var(--info)] font-medium hover:underline text-center"
            >
              Back to Login
            </Link>
            <Link
              href="/request-password-reset"
              className="text-[var(--info)] font-medium hover:underline text-center"
            >
              Request another reset email
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}