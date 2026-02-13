"use client";

import {
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  Clock,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { EditConsumerProfile } from "../editProfile/schema";
import { handleConsumerGetProfile } from "@/lib/actions/consumer/ConsumerProfileAction";
import { toast } from "react-toastify";

export default function ConsumerProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<EditConsumerProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await handleConsumerGetProfile();
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-32"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={process.env.NEXT_PUBLIC_API_BASE_URL+user.profile_image || "/images/Portrait_Placeholder.png"}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.fullName}
                </h1>
                <p className="text-lg text-green-600 font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                  Consumer
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md hover:cursor-pointer"
                  onClick={() => {
                    router.push("/consumer/editProfile");
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
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-gray-900 break-all">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-0.5">Location</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.userLocation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Activity
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Total Orders
                  </span>
                  <span className="text-lg font-bold text-green-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Member Since
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {2018}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-6">
  
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Orders
                </h2>
                <button className="text-sm text-green-600 font-medium hover:text-green-700">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                      🥬
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Organic Vegetables Pack
                      </p>
                      <p className="text-sm text-gray-600">
                        Delivered • Jan 30, 2026
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">NPR 850</p>
                    <span className="inline-block px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full mt-1 font-medium">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                      🍎
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Fresh Fruits Basket
                      </p>
                      <p className="text-sm text-gray-600">
                        Delivered • Jan 25, 2026
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">NPR 1200</p>
                    <span className="inline-block px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full mt-1 font-medium">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                      🌾
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Organic Rice 5kg
                      </p>
                      <p className="text-sm text-gray-600">
                        Delivered • Jan 20, 2026
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">NPR 650</p>
                    <span className="inline-block px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full mt-1 font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Farmers */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Favorite Farmers
                </h2>
                <button className="text-sm text-green-600 font-medium hover:text-green-700">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Green Farm"
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Green Farm
                      </p>
                      <p className="text-xs text-gray-600">Kathmandu</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-yellow-500 font-medium">⭐ 4.8</span>
                    <span className="text-gray-600">24 products</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Valley Organic"
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Valley Organic
                      </p>
                      <p className="text-xs text-gray-600">Lalitpur</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-yellow-500 font-medium">⭐ 4.9</span>
                    <span className="text-gray-600">18 products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
