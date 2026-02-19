"use client";

import { useState, useEffect } from "react";
import { Edit, Trash, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../crops/schema";
import { toast } from "react-toastify";
import {
  handledeleteProduct,
  handleGetFarmersProduct,
} from "@/lib/actions/farmer/productActions";

export default function MyCrops() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await handleGetFarmersProduct();
        console.log("hre is he00", res);
        setProducts(res.data);
      } catch (err: Error | any) {
        toast.error(err.message || "Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setLoading(true);
      await handledeleteProduct(selectedProduct._id);
      setProducts((prev) => prev.filter((p) => p._id !== selectedProduct._id));
      toast.success("Product deleted successfully");
      setShowModal(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">My Crops</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:cursor-pointer transition"
          onClick={() => {
            router.push("/farmer/addProduct");
          }}
        >
          <Plus className="w-4 h-4" /> Add New Crop
        </button>
      </div>

      {/* Crops Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-green-100 rounded-xl shadow-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">
                Crop
              </th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">
                Quantity
              </th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">
                Last Updated
              </th>
              <th className="p-4 text-left text-green-700 font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((crop, index) => (
              <tr
                key={crop._id}
                className={`border-b border-green-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-green-50"
                } hover:bg-green-100 transition-colors hover:cursor-pointer`}
                onClick={() => {
                  router.push(`/farmer/${crop._id}`);
                }}
              >
                <td className="p-4 font-semibold text-green-800">
                  {crop.productName}
                </td>
                <td className="p-4">{`${crop.quantity} ${crop.unitType}`}</td>
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
                <td className="p-4 font-medium text-green-800">
                  Rs. {`${crop.price.toFixed(2)}/ ${crop.unitType}`}
                </td>
                <td className="p-4">
                  {crop.updatedAt
                    ? new Date(crop.updatedAt).toISOString().split("T")[0]
                    : "N/A"}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/farmer/${crop._id}/edit`);
                    }}
                  >
                    <Edit className="w-4 h-4 text-green-600" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(crop);
                    }}
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {selectedProduct?.productName}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
