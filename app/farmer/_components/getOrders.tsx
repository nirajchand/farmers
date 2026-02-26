"use client";

import {
  handleGetFarmerOrder,
  handleUpdateOrderStatus,
} from "@/lib/actions/farmer/order.action";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ChevronDown, Calendar, Filter } from "lucide-react";

type Order = {
  _id: string;
  consumerName?: string;
  consumer?: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  paymentStatus: "Paid" | "Pending";
  orderStatus: "Pending" | "Accepted" | "Shipped" | "Delivered" | "Cancelled";
  items: { productName: string; quantity: number; unitType: string }[];
  totalAmount: number;
  shippingAddress: string;
  createdAt?: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterView, setFilterView] = useState<"all" | "daily" | "monthly">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");

  const fetchOrders = async () => {
    setLoading(true);
    const res = await handleGetFarmerOrder();
    if (res.success) {
      const transformedOrders = res.data.map((order: any) => ({
        _id: order._id,
        consumer: {
          fullName: order.consumerId.fullName,
          email: order.consumerId.email,
          phoneNumber: order.consumerId.phoneNumber,
        },
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        items: order.items,
        totalAmount: order.totalAmount,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
      }));
      setOrders(transformedOrders);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  const updateStatus = async (orderId: string, status: string) => {
    const res = await handleUpdateOrderStatus(orderId, status);
    if (res.success) {
      toast.success(res.message);
      fetchOrders();
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on date view
  const getFilteredOrders = () => {
    let filtered = orders;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filterView === "daily") {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt || "");
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });
    } else if (filterView === "monthly") {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt || "");
        return (
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      });
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.orderStatus === statusFilter);
    }

    if (paymentFilter !== "All") {
      filtered = filtered.filter(
        (order) => order.paymentStatus === paymentFilter,
      );
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();
  const statusOptions = [
    "Pending",
    "Accepted",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const stats = {
    total: filteredOrders.length,
    pending: filteredOrders.filter((o) => o.orderStatus === "Pending").length,
    accepted: filteredOrders.filter((o) => o.orderStatus === "Accepted").length,
    shipped: filteredOrders.filter((o) => o.orderStatus === "Shipped").length,
    delivered: filteredOrders.filter((o) => o.orderStatus === "Delivered")
      .length,
    revenue: filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0),
  };

  return (
    <div className="flex gap-6 bg-gray-50 min-h-screen">
      {/* Sidebar Filter */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        </div>

        {/* Date Range Filter */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            Date Range
          </p>
          <div className="space-y-3">
            {[
              { label: "All Orders", value: "all" },
              { label: "Today's Orders", value: "daily" },
              { label: "This Month", value: "monthly" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50 transition"
              >
                <input
                  type="radio"
                  name="dateRange"
                  value={option.value}
                  checked={filterView === option.value}
                  onChange={(e) => setFilterView(e.target.value as any)}
                  className="w-4 h-4 text-green-600 accent-green-600"
                />
                <span className="ml-3 text-sm text-gray-700 font-medium">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Order Status Filter */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-4">
            Order Status
          </p>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Status Filter */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-4">
            Payment Status
          </p>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Statistics */}
        <div className="border-t pt-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">Statistics</p>
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-green-700">{stats.total}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Pending</p>
                <p className="text-xl font-bold text-blue-700">
                  {stats.pending}
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Shipped</p>
                <p className="text-xl font-bold text-orange-700">
                  {stats.shipped}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Accepted</p>
                <p className="text-xl font-bold text-purple-700">
                  {stats.accepted}
                </p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Delivered</p>
                <p className="text-xl font-bold text-emerald-700">
                  {stats.delivered}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-lg mt-3">
              <p className="text-xs text-gray-700 mb-1 font-medium">
                Total Revenue
              </p>
              <p className="text-xl font-bold text-green-800">
                Rs. {stats.revenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={() => {
            setFilterView("all");
            setStatusFilter("All");
            setPaymentFilter("All");
          }}
          className="w-full mt-6 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition"
        >
          Reset Filters
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Farmer Orders
          </h1>
          <p className="text-gray-600">
            {filterView === "daily"
              ? "Today's Orders"
              : filterView === "monthly"
                ? "This Month's Orders"
                : "All Orders"}
          </p>
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono text-sm font-semibold text-gray-800">
                      {order._id}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">
                        Payment Status
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Order Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.orderStatus === "Accepted"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "Shipped"
                                ? "bg-orange-100 text-orange-800"
                                : order.orderStatus === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consumer and Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Consumer Details
                    </p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Name</p>
                        <p className="font-semibold text-gray-800">
                          {order.consumer?.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="text-sm text-gray-700">
                          {order.consumer?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="text-sm text-gray-700">
                          {order.consumer?.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Shipping Address
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {order.shippingAddress}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Order Items
                  </p>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className={`flex justify-between items-center px-4 py-3 ${
                          i !== order.items.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        <span className="font-medium text-gray-800">
                          {item.productName}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.quantity} {item.unitType}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total and Status Update */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-green-600">
                      Rs. {order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full md:w-auto">
                    <p className="text-sm text-gray-600 mb-2">
                      Update Order Status
                    </p>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="w-full md:w-64 border-2 border-green-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent font-semibold text-gray-700 hover:border-green-300 transition disabled:opacity-50"
                      disabled={
                        order.orderStatus === "Delivered" ||
                        order.orderStatus === "Cancelled"
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
