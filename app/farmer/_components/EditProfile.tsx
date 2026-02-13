"use client";

import {
  Camera,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { editFarmerProfile, EditFarmerProfile } from "../editProfile/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleGetFarmerProfile, handleUpdateFarmerProfile } from "@/lib/actions/farmer/FarmerProfileActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditFarmerProfilePage() {
  const { register, handleSubmit, control, reset } = useForm<EditFarmerProfile>({
    resolver: zodResolver(editFarmerProfile),
  });

  const [user, setUser] = useState<EditFarmerProfile | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await handleGetFarmerProfile();
        setUser(data);
        reset(data); // populate the form with fetched data
        setPreview(data.profile_image ? process.env.NEXT_PUBLIC_API_BASE_URL + data.profile_image : null);
      } catch (error: any) {
        toast.error(error.message || "Data not found!");
      }
    };
    fetchData();
  }, [reset]);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void
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

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreview(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: EditFarmerProfile) => {
    try {
      await handleUpdateFarmerProfile(data);
      toast.success("Profile updated successfully!");
      reset(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">
            Update your personal and farm information
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-200">
            <div className="relative">
              <img
                src={preview || "/placeholder-profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-100 shadow-lg"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 w-12 h-12 bg-green-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                onClick={() => fileInputRef.current?.click()} // trigger file input
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
                    className="hidden" // hide input
                    onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Personal Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      {...register("phoneNumber")}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-600" />
                Farm Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register("farmName")}
                      placeholder="Enter your farm name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register("farmLocation")}
                      placeholder="City, District, Nepal"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...register("description")}
                      placeholder="Tell us about your farm, what you grow, and your farming practices..."
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Brief description about your farm and products
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
                onClick={()=>{
                  router.replace("/farmer/profile")
                }}
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
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <span className="font-semibold">Tip:</span> Keep your profile
            updated to help customers find and trust your farm.
          </p>
        </div>
      </div>
    </div>
  );
}
