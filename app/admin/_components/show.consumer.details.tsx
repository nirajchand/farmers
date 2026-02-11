"use client";

import { EditConsumerProfile } from "@/app/consumer/editProfile/schema";
import { handleGetConsumerById } from "@/lib/actions/admin/user_action";
import { handleConsumerGetProfile } from "@/lib/actions/consumer/ConsumerProfileAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function ShowConsumerDetails({ userId }: { userId: string }) {

  const [user, setUser] = useState<EditConsumerProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await handleGetConsumerById(userId);
        setUser(data);
      } catch (error: Error | any) {
        toast.error(error.message || "Failed to fetch user");
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-1">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-10">
        {/* Profile Image + Name */}
        <div className="flex flex-col items-center text-center border-b pb-8">
          <img
            src={process.env.NEXT_PUBLIC_API_BASE_URL + user.profile_image}
            alt="Profile"
            className="w-45 h-45 rounded-full object-cover border-4 border-green-100 shadow-sm"
          />

          <h1 className="text-3xl font-semibold text-gray-800 mt-4">
            {user.fullName}
          </h1>

          <p className="text-gray-500 mt-1">Consumer</p>
        </div>

        {/* Details Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Full Name */}
          <div className="space-y-1">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Full Name
            </p>
            <p className="text-lg font-medium text-gray-800">{user.fullName}</p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Email Address
            </p>
            <p className="text-lg font-medium text-gray-800 break-all">
              {user.email}
            </p>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Phone Number
            </p>
            <p className="text-lg font-medium text-gray-800">
              {user.phoneNumber || "Not Provided"}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Location
            </p>
            <p className="text-lg font-medium text-gray-800">
              {user.userLocation || "Not Provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
