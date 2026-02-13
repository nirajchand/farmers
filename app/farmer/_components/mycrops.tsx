"use client";

import { useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";

interface Crop {
  id: number;
  name: string;
  quantity: number;
  status: "Growing" | "Ready" | "Sold";
  price: number;
  lastUpdated: string;
}

export default function MyCrops() {
  const [crops, setCrops] = useState<Crop[]>([
    { id: 1, name: "Tomatoes", quantity: 50, status: "Growing", price: 2, lastUpdated: "2026-02-01" },
    { id: 2, name: "Potatoes", quantity: 30, status: "Ready", price: 1.5, lastUpdated: "2026-02-03" },
    { id: 3, name: "Carrots", quantity: 20, status: "Sold", price: 3, lastUpdated: "2026-01-28" },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">My Crops</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
          <Plus className="w-4 h-4" /> Add New Crop
        </button>
      </div>

      {/* Search / Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search crops..."
          className="w-full md:w-1/3 px-4 py-2 border border-green-200 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
        />
      </div>

      {/* Crops Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-green-100 rounded-xl shadow-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">Crop</th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">Quantity (kg)</th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">Status</th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">Price ($/kg)</th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">Last Updated</th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop, index) => (
              <tr
                key={crop.id}
                className={`border-b border-green-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-green-50"
                } hover:bg-green-100 transition-colors`}
              >
                <td className="p-4 font-semibold text-green-800">{crop.name}</td>
                <td className="p-4">{crop.quantity}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      crop.status === "Growing"
                        ? "bg-yellow-100 text-yellow-700"
                        : crop.status === "Ready"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {crop.status}
                  </span>
                </td>
                <td className="p-4 font-medium text-green-800">${crop.price.toFixed(2)}</td>
                <td className="p-4">{crop.lastUpdated}</td>
                <td className="p-4 flex gap-2">
                  <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition">
                    <Edit className="w-4 h-4 text-green-600" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition">
                    <Trash className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
