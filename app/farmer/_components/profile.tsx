"use client";

import { handleGetFarmerProfile } from "@/lib/actions/farmer/FarmerProfileActions";
import { Mail, Phone, MapPin, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EditFarmerProfile } from "../editProfile/schema";

export default function ProfilePage() {
  const [user, setUser] = useState<EditFarmerProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await handleGetFarmerProfile();
        setUser(data);
      } catch (error: Error | any) {
        toast.error(error.message || "Failed to fetch user");
      }
    };
    fetchProfile();
  }, []);



  
  // Loading state
  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden mb-6 border border-[var(--border)]">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] h-32"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={
                    process.env.NEXT_PUBLIC_API_BASE_URL + user.profile_image ||
                    "/images/Portrait_Placeholder.png"
                  }
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                  {user.fullName}
                </h1>
                <p className="text-lg text-[var(--primary)] font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                  {"Farmer"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] hover:cursor-pointer transition-colors shadow-md"
                  onClick={() => {
                    router.push("/farmer/editProfile");
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-[var(--card-bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4 pb-3 border-b border-[var(--border)]">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--secondary-foreground)] mb-0.5">Email</p>
                    <p className="text-sm font-medium text-[var(--foreground)] break-all">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--secondary-foreground)] mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {user.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[var(--secondary-foreground)] mb-0.5">Location</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {user.farmLocation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Farm Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About Farm */}
            <div className="bg-[var(--card-bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4 pb-3 border-b border-[var(--border)]">
                About the Farm
              </h2>
              <p className="text-[var(--secondary-foreground)] leading-relaxed">
                {user.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--primary-light)] rounded-lg">
                  <p className="text-sm text-[var(--secondary-foreground)] mb-1">Established</p>
                  <p className="font-semibold text-[var(--foreground)]">
                    {user.createdAt
                      ? new Date(user.createdAt).getFullYear()
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
