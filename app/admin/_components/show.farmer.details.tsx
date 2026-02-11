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
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-10">

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center border-b pb-8">
          <img
            src={process.env.NEXT_PUBLIC_API_BASE_URL + user.profile_image}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-green-100 shadow-sm"
          />

          <h1 className="text-3xl font-semibold text-gray-800 mt-4">
            {user.fullName}
          </h1>

          <p className="text-gray-500 mt-1">Farmer</p>
        </div>

        {/* Details Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Full Name */}
          <div>
            <p className="text-sm text-gray-400 uppercase">Full Name</p>
            <p className="text-lg font-medium text-gray-800">
              {user.fullName}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-gray-400 uppercase">Email</p>
            <p className="text-lg font-medium text-gray-800 break-all">
              {user.email}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-sm text-gray-400 uppercase">Phone Number</p>
            <p className="text-lg font-medium text-gray-800">
              {user.phoneNumber || "Not Provided"}
            </p>
          </div>

          {/* Farm Name */}
          <div>
            <p className="text-sm text-gray-400 uppercase">Farm Name</p>
            <p className="text-lg font-medium text-gray-800">
              {user.farmName || "Not Provided"}
            </p>
          </div>

          {/* Farm Location */}
          <div>
            <p className="text-sm text-gray-400 uppercase">Farm Location</p>
            <p className="text-lg font-medium text-gray-800">
              {user.farmLocation || "Not Provided"}
            </p>
          </div>
        </div>

        {/* Description Full Width */}
        <div className="mt-8">
          <p className="text-sm text-gray-400 uppercase">Description</p>
          <p className="text-lg font-medium text-gray-800 mt-1">
            {user.description || "Not Provided"}
          </p>
        </div>

      </div>
    </div>
  );
}
