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
  const { register, handleSubmit, control, reset } =
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
        // setPreview(data.profile_image);
        setPreview(
          data.profile_image
            ? process.env.NEXT_PUBLIC_API_BASE_URL + data.profile_image
            : null,
        ); // show current profile image
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
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });

      const response = await handleUpdateUser(userId, formData);

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
    <div className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Edit Profile</h1>
          <p className="text-[var(--secondary-foreground)] mt-2">Update your personal information</p>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 border border-[var(--border)]"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-[var(--border)]">
            <div className="relative">
              <img
                src={preview || "/images/Portrait_Placeholder.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[var(--primary-light)] shadow-lg"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 w-12 h-12 bg-[var(--primary)] rounded-full border-4 border-[var(--card-bg)] shadow-lg flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors"
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
                      className="mt-2 text-[var(--error)] underline"
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
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--primary)]" />
                Personal Information
              </h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className="w-full pl-3 pr-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all bg-[var(--input-bg)] text-[var(--foreground)]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                    className="w-full pl-3 pr-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] transition-all bg-[var(--input-bg)] text-[var(--foreground)]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full pl-3 pr-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] transition-all bg-[var(--input-bg)] text-[var(--foreground)]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register("userLocation")}
                    placeholder="City, District, Nepal"
                    className="w-full pl-3 pr-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] transition-all bg-[var(--input-bg)] text-[var(--foreground)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[var(--border)]">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => reset(user)}
              className="flex-1 px-6 py-3 bg-[var(--secondary)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--secondary)]/80 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-[var(--primary-light)] rounded-lg border border-[var(--primary)]">
          <p className="text-sm text-[var(--primary)]">
            <span className="font-semibold">Tip:</span> Keep your profile
            updated
          </p>
        </div>
      </div>
    </div>
  );
}
