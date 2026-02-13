"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Save, X, User, Mail, Phone, MapPin } from "lucide-react";
import { useRef, useState, useEffect, startTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { handleUpdateConsumerProfile } from "@/lib/actions/consumer/ConsumerProfileAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  editConsumerProfile,
  EditConsumerProfile,
} from "@/app/consumer/editProfile/schema";
import {
  handleGetConsumerById,
  handleUpdateUser,
} from "@/lib/actions/admin/user_action";

export default function EditConsumer({ userId }: { userId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [user, setUser] = useState<EditConsumerProfile | null>(null);
  const router = useRouter();

  // React Hook Form setup
  const { register, handleSubmit, control, reset, setValue, watch } =
    useForm<EditConsumerProfile>({
      resolver: zodResolver(editConsumerProfile),
    });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await handleGetConsumerById(userId);
        setUser(data);
        reset(data); // initialize form with fetched data
        setPreview(data.profile_image); // show current profile image
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch user profile");
      }
    };
    fetchProfile();
  }, [reset]);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  // Handle form submission
  const onSubmit = async (data: EditConsumerProfile) => {
    try {
      const payload = { ...data, role: "consumer" };
      const response = await handleUpdateUser(userId, payload);
      console.log("sending data:", response);

      if (!response.success) {
        toast.error(response.message || "Update failed");
        return;
      }
      toast.success(response.message || "Profile updated successfully");
      startTransition(() => {
        router.replace("/admin/users");
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // Handle image changes
  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    onChange(file);
  };

  // Remove selected image
  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreview(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your personal information</p>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-200">
            <div className="relative">
              <img
                src={
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}${preview}` ||
                  "/images/Portrait_Placeholder.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-100 shadow-lg"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 w-12 h-12 bg-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            <Controller
              control={control}
              name="profile_image"
              render={({ field: { onChange } }) => (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
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

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Personal Information
              </h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                    className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register("userLocation")}
                    placeholder="City, District, Nepal"
                    className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => reset(user)}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <span className="font-semibold">Tip:</span> Keep your profile
            updated
          </p>
        </div>
      </div>
    </div>
  );
}
