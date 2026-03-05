"use client";

import { useState, useEffect } from "react";
import {
  Edit,
  Trash,
  Plus,
  Leaf,
  TrendingUp,
  Package,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../schema";
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

  // Calculate statistics
  const stats = {
    total: products.length,
    ready: products.filter((p) => p.status === "Ready").length,
    growing: products.filter((p) => p.status === "Growing").length,
    sold: products.filter((p) => p.status === "Sold").length,
  };

  const statCards = [
    {
      label: "Total Products",
      value: stats.total,
      icon: Package,
      bgColor: "bg-[var(--primary-light)]",
      iconColor: "text-[var(--primary)]",
      borderColor: "border-[var(--primary)]",
    },
    {
      label: "Ready to Sell",
      value: stats.ready,
      icon: CheckCircle,
      bgColor: "bg-[var(--success-light)]",
      iconColor: "text-[var(--success)]",
      borderColor: "border-[var(--success)]",
    },
    {
      label: "Growing",
      value: stats.growing,
      icon: Leaf,
      bgColor: "bg-[var(--warning-light)]",
      iconColor: "text-[var(--warning)]",
      borderColor: "border-[var(--warning)]",
    },
    {
      label: "Sold",
      value: stats.sold,
      icon: TrendingUp,
      bgColor: "bg-[var(--info-light)]",
      iconColor: "text-[var(--info)]",
      borderColor: "border-[var(--info)]",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--primary)]">My Crops</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-dark)] hover:cursor-pointer transition shadow-md hover:shadow-lg"
          onClick={() => {
            router.push("/farmer/addProduct");
          }}
        >
          <Plus className="w-4 h-4" /> Add New Crop
        </button>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} border-2 ${stat.borderColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--secondary-foreground)] text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-[var(--foreground)]">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Crops Table */}
      <div className="overflow-x-auto rounded-xl shadow-sm border border-[var(--border)]">
        <table className="min-w-full bg-[var(--card-bg)]">
          <thead className="bg-[var(--secondary)] border-b border-[var(--border)]">
            <tr>
              <th className="p-4 text-left text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">
                Crop
              </th>
              <th className="p-4 text-left text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">
                Quantity
              </th>
              <th className="p-4 text-left text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">
                Status
              </th>
              <th className="p-4 text-left text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">
                Price
              </th>
              <th className="p-4 text-left text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">
                Last Updated
              </th>
              <th className="p-4 text-left text-[var(--primary)] font-semibold uppercase tracking-wider text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((crop, index) => (
                <tr
                  key={crop._id}
                  className={`border-b border-[var(--border)] ${
                    index % 2 === 0 ? "bg-[var(--card-bg)]" : "bg-[var(--secondary)]"
                  } hover:bg-[var(--secondary)] transition-colors hover:cursor-pointer`}
                  onClick={() => {
                    router.push(`/farmer/${crop._id}`);
                  }}
                >
                  <td className="p-4 font-semibold text-[var(--foreground)]">
                    {crop.productName}
                  </td>
                  <td className="p-4 text-[var(--secondary-foreground)]">{`${crop.quantity} ${crop.unitType}`}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        crop.status === "Growing"
                          ? "bg-[var(--warning-light)] text-[var(--warning)]"
                          : crop.status === "Ready"
                            ? "bg-[var(--success-light)] text-[var(--success)]"
                            : crop.status === "Sold"
                              ? "bg-[var(--info-light)] text-[var(--info)]"
                              : "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                      }`}
                    >
                      {crop.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-[var(--primary)]">
                    Rs. {`${crop.price.toFixed(2)}/ ${crop.unitType}`}
                  </td>
                  <td className="p-4 text-[var(--secondary-foreground)]">
                    {crop.updatedAt
                      ? new Date(crop.updatedAt).toISOString().split("T")[0]
                      : "N/A"}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-[var(--primary-light)] hover:bg-[var(--primary-light)]/80 transition hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/farmer/${crop._id}/edit`);
                      }}
                    >
                      <Edit className="w-4 h-4 text-[var(--primary)]" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-[var(--error-light)] hover:bg-[var(--error-light)]/80 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(crop);
                      }}
                    >
                      <Trash className="w-4 h-4 text-[var(--error)]" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[var(--secondary-foreground)]">
                  <div className="flex flex-col items-center justify-center">
                    <Package className="w-12 h-12 text-[var(--secondary-foreground)] mb-2" />
                    <p className="text-lg font-medium">No crops found</p>
                    <p className="text-sm text-[var(--secondary-foreground)]">
                      Start by adding your first crop
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[var(--card-bg)] rounded-xl shadow-lg p-6 w-[350px] border border-[var(--border)]">
            <h2 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Confirm Delete</h2>

            <p className="text-[var(--secondary-foreground)] mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {selectedProduct?.productName}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--secondary)] text-[var(--foreground)]"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-[var(--error)] text-white rounded-lg hover:bg-[var(--error)]/80 disabled:opacity-50"
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
