"use client";

import { EditConsumerProfile } from "@/app/consumer/editProfile/schema";
import { EditFarmerProfile } from "@/app/farmer/editProfile/schema";
import { handleGetConsumerById, handleGetFarmerById } from "@/lib/actions/admin/user_action";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ShowFarmerDetails({ userId }: { userId: string }) {
  const [user, setUser] = useState<EditFarmerProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await handleGetFarmerById(userId);
        setUser(data);
      } catch (error: Error | any) {
        toast.error(error.message || "Failed to fetch user");
      }
    };
    fetchProfile();
  }, [userId]);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-[var(--card-bg)] rounded-3xl shadow-lg p-10 border border-[var(--border)]">

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center border-b border-[var(--border)] pb-8">
          <img
            src={process.env.NEXT_PUBLIC_API_BASE_URL + user.profile_image}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-[var(--primary-light)] shadow-sm"
          />

          <h1 className="text-3xl font-semibold text-[var(--foreground)] mt-4">
            {user.fullName}
          </h1>

          <p className="text-[var(--secondary-foreground)] mt-1">Farmer</p>
        </div>

        {/* Details Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Full Name */}
          <div>
            <p className="text-sm text-[var(--secondary-foreground)] uppercase">Full Name</p>
            <p className="text-lg font-medium text-[var(--foreground)]">
              {user.fullName}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-[var(--secondary-foreground)] uppercase">Email</p>
            <p className="text-lg font-medium text-[var(--foreground)] break-all">
              {user.email}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-sm text-[var(--secondary-foreground)] uppercase">Phone Number</p>
            <p className="text-lg font-medium text-[var(--foreground)]">
              {user.phoneNumber || "Not Provided"}
            </p>
          </div>

          {/* Farm Name */}
          <div>
            <p className="text-sm text-[var(--secondary-foreground)] uppercase">Farm Name</p>
            <p className="text-lg font-medium text-[var(--foreground)]">
              {user.farmName || "Not Provided"}
            </p>
          </div>

          {/* Farm Location */}
          <div>
            <p className="text-sm text-[var(--secondary-foreground)] uppercase">Farm Location</p>
            <p className="text-lg font-medium text-[var(--foreground)]">
              {user.farmLocation || "Not Provided"}
            </p>
          </div>
        </div>

        {/* Description Full Width */}
        <div className="mt-8">
          <p className="text-sm text-[var(--secondary-foreground)] uppercase">Description</p>
          <p className="text-lg font-medium text-[var(--foreground)] mt-1">
            {user.description || "Not Provided"}
          </p>
        </div>

      </div>
    </div>
  );
}
