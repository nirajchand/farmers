"use client";

import { handleGetMyOrder } from "@/lib/actions/consumer/order.action";
import { useEffect, useState } from "react";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  items: OrderItem[];
}

type FilterType = "all" | "daily" | "monthly";

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    async function fetchOrders() {
      const res = await handleGetMyOrder();
      if (res.success) {
        setOrders(res.data || []);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  // Filter orders based on selected filter
  useEffect(() => {
    const now = new Date();
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      if (filter === "all") {
        return true;
      } else if (filter === "daily") {
        // Orders from today
        return orderDate.toDateString() === now.toDateString();
      } else if (filter === "monthly") {
        // Orders from current month
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      return true;
    });

    setFilteredOrders(filtered);
  }, [orders, filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-green-600 text-xl font-semibold">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        No orders found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">My Orders</h1>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === "all"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-green-600 border border-green-200 hover:border-green-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("daily")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === "daily"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-green-600 border border-green-200 hover:border-green-400"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("monthly")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === "monthly"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-green-600 border border-green-200 hover:border-green-400"
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">
          No orders found for the selected filter.
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-green-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    order.orderStatus === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "CANCELLED"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-green-600 font-semibold">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Payment: {order.paymentMethod}
                  </p>
                  <p className="text-sm font-semibold">
                    PaymentStatus:{" "}
                    <span
                      className={
                        order.paymentStatus === "PAID"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>

                <p className="text-xl font-bold text-green-700">
                  Total: Rs. {order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
