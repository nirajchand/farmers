"use client";

import { Mail, Phone, MapPin, ShoppingBag, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { EditConsumerProfile } from "../editProfile/schema";
import { handleConsumerGetProfile } from "@/lib/actions/consumer/ConsumerProfileAction";
import { toast } from "react-toastify";
import { handleGetMyOrder } from "@/lib/actions/consumer/order.action";

export default function ConsumerProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<EditConsumerProfile | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await handleConsumerGetProfile();
        setUser(profileRes.data);

        const orderRes = await handleGetMyOrder();
        if (orderRes.success) {
          setOrders(orderRes.data || []);
        }
      } catch (error: Error | any) {
        toast.error(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !user) {
    return (
      <p className="text-center mt-10 text-[var(--primary)] font-semibold">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[var(--primary)] to-emerald-600 h-32"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              {/* Profile Image */}
              <div>
                <img
                  src={
                    user.profile_image
                      ? process.env.NEXT_PUBLIC_API_BASE_URL +
                        user.profile_image
                      : "/images/Portrait_Placeholder.png"
                  }
                  className="w-32 h-32 rounded-full object-cover border-4 border-[var(--card-bg)] shadow-xl"
                />
              </div>

              {/* Name */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                  {user.fullName}
                </h1>
                <p className="text-lg text-[var(--primary)] font-medium mt-1">
                  Consumer
                </p>
              </div>

              {/* Edit Button */}
              <button
                className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition shadow-md"
                onClick={() => router.push("/consumer/editProfile")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact Info */}
            <div className="bg-[var(--card-bg)] rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4 border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--secondary-foreground)]">Email</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">{user.email}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--secondary-foreground)]">Phone</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">{user.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--secondary-foreground)]">Location</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">{user.userLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="bg-[var(--card-bg)] rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4 border-b border-[var(--border)] pb-2 text-[var(--foreground)]">Activity</h2>

              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center gap-2 text-[var(--foreground)]">
                  <ShoppingBag className="w-4 h-4" />
                  Total Orders
                </span>
                <span className="text-lg font-bold text-[var(--primary)]">
                  {orders.length}
                </span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-sm flex items-center gap-2 text-[var(--foreground)]">
                  <Clock className="w-4 h-4" />
                  Member Since
                </span>
                <span className="text-sm font-medium">
                  {new Date(user.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="md:col-span-2 bg-[var(--card-bg)] rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-3">
              <h2 className="text-xl font-bold text-[var(--foreground)]">Recent Orders</h2>

              <button
                onClick={() => router.push("/consumer/orders")}
                className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold"
              >
                View All
              </button>
            </div>

            {orders.length === 0 ? (
              <p className="text-[var(--secondary-foreground)] text-sm">No recent orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center p-6 bg-[var(--secondary)] rounded-xl border border-[var(--border)] hover:shadow-md transition"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-1">

                      <p className="text-sm text-[var(--secondary-foreground)]">
                        Order #{order._id.slice(-6)}
                      </p>

                      <p className="text-sm text-[var(--secondary-foreground)]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-[var(--primary)]">
                        NPR {order.totalAmount}
                      </p>

                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full mt-2 font-semibold ${
                          order.orderStatus === "DELIVERED"
                            ? "bg-[var(--success-light)] text-[var(--success)]"
                            : order.orderStatus === "CANCELLED"
                              ? "bg-[var(--error-light)] text-[var(--error)]"
                              : "bg-[var(--warning-light)] text-[var(--warning)]"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
