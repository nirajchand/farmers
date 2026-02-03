"use client";
import { useRef, useState, useTransition } from "react";
import { userSchema, UserSchema } from "../users/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { handleUserCreate } from "@/lib/actions/admin/user_action";

export default function CreateUser() {
  // React hook form setup with zod resolver
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({ resolver: zodResolver(userSchema) });

  // for image preview and reset
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // transition for smoother ux
  const [pending, startTransition] = useTransition();

  // Handle image preview and pass file to RHF controller
  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const render = new FileReader();
      render.onloadend = () => setPreview(render.result as string);
      render.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    onChange(file);
  };

  // dismiss image preview and clear input
  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreview(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Form submit handler
  const onSubmit = async (data: UserSchema) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        // Append fields to form Data
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        formData.append("role", data.role);

        if (data.profile_image)
          formData.append("profile_image", data.profile_image);

        const response = await handleUserCreate(formData);
        if (!response.success)
          throw new Error(response.message || "User creation failed");

        // Reset form and image
        reset();
        handleDismissImage();
        toast.success("User created successfully");
      } catch (e: Error | any) {
        toast.error(e.message || "User creation failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/3 bg-green-50 flex flex-col items-center justify-center p-6">
          <h3 className="text-xl font-semibold mb-4">Profile Image</h3>
          <img
            src={preview || "/images/Portrait_Placeholder.png"}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover mb-4"
          />
          <Controller
            control={control}
            name="profile_image"
            render={({ field: { onChange } }) => (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".jpg,.jpeg,.png,.webp"
                  className="text-sm text-gray-500"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                />
                {preview && (
                  <button
                    type="button"
                    className="mt-2 text-red-500 underline"
                    onClick={() => handleDismissImage(onChange)}
                  >
                    Remove Image
                  </button>
                )}
              </>
            )}
          />
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 p-8 flex-1">
          <h2 className="text-3xl font-bold text-center mb-8">Create User</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-lg"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-lg"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register("role")}
                className="w-full border border-gray-300 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-lg"
              >
                <option value="">Select Role</option>
                <option value="farmer">Farmer</option>
                <option value="consumer">Consumer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || pending}
              className="w-full bg-green-500 text-white font-semibold py-4 rounded-lg hover:bg-green-600 transition text-lg disabled:opacity-50"
            >
              {isSubmitting || pending ? "Creating..." : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
