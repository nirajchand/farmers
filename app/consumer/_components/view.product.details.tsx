"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductDetails } from "../[id]/schema";
import { handleAddToCart } from "@/lib/actions/farmer/CartActions";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";

export default function ViewProductDetails({
  product,
}: {
  product: ProductDetails;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
    const { refreshCart } = useCart();
    
  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddProductToCart = async (
    productId: string,
    quantity: number,
  ) => {
    try {
      const response = await handleAddToCart(productId, quantity);

      if (response) {
        toast.success("Product added to cart");
        refreshCart();
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-6xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[var(--secondary-foreground)] hover:text-[var(--foreground)] font-medium transition"
        >
          <span className="mr-2 text-xl">←</span> Back
        </button>
      </div>

      <div className="max-w-6xl w-full bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          {product.product_image ? (
            <img
              src={process.env.NEXT_PUBLIC_API_BASE_URL + product.product_image}
              alt={product.productName}
              className="w-[450px] h-[450px] object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-[450px] h-[450px] bg-[var(--secondary)] rounded-xl flex items-center justify-center text-[var(--secondary-foreground)]">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          {/* Top Section */}
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
              {product.productName}
            </h1>

            <p className="text-2xl font-semibold text-[var(--primary)] mb-4">
              Rs. {product.price} / {product.unitType}
            </p>

            {/* Status & Stock */}
            <div className="flex gap-3 mb-6">
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                  product.status === "Ready"
                    ? "bg-green-600"
                    : product.status === "Growing"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              >
                {product.status}
              </span>

              <span className="px-4 py-1 rounded-full text-sm font-medium bg-[var(--primary-light)] text-[var(--primary)]">
                Stock: {product.quantity} {product.unitType}
              </span>
            </div>

            {/* Description */}
            <div className="bg-[var(--secondary)] p-5 rounded-lg border border-[var(--border)] mb-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                Product Description
              </h3>
              <p className="text-[var(--secondary-foreground)] text-sm leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Farm Information */}
            <div className="bg-[var(--secondary)] p-5 rounded-lg border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">
                Farm Information
              </h3>

              <div className="space-y-2 text-sm text-[var(--secondary-foreground)]">
                <p>
                  <span className="font-semibold text-[var(--foreground)]">
                    Farm Name:
                  </span>{" "}
                  {product.farmerId?.farmName || "N/A"}
                </p>

                <p>
                  <span className="font-semibold text-[var(--foreground)]">Location:</span>{" "}
                  {product.farmerId?.farmLocation || "N/A"}
                </p>

                <p>
                  <span className="font-semibold text-[var(--foreground)]">Contact:</span>{" "}
                  {product.farmerId?.phoneNumber ? (
                    <a
                      href={`tel:${product.farmerId.phoneNumber}`}
                      className="text-[var(--primary)] hover:underline"
                    >
                      {product.farmerId.phoneNumber}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>

                <div className="pt-2">
                  <span className="font-semibold text-[var(--foreground)]">
                    About Farm:
                  </span>
                  <p className="mt-1 text-[var(--secondary-foreground)]">
                    {product.farmerId?.description ||
                      "No farm description available."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 flex flex-col gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Quantity:</span>

              <div className="flex items-center border rounded-lg overflow-hidden w-40 bg-white">
                <button
                  onClick={handleDecrement}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
                >
                  −
                </button>

                <input
                  type="text"
                  readOnly
                  value={`${quantity} ${product.unitType}`}
                  className="text-center w-full py-2 font-medium text-gray-800 outline-none"
                />

                <button
                  onClick={handleIncrement}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add To Cart */}
            <button
              disabled={product.status === "Sold"}
              onClick={() => {
                if (product.status !== "Sold") {
                  handleAddProductToCart(product._id, quantity);
                }
              }}
              className={`w-full rounded-xl py-4 text-lg font-semibold shadow-md transition
                  ${
                    product.status === "Sold"
                      ? "bg-[var(--secondary-foreground)] cursor-not-allowed text-white"
                      : "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                  }
                `}
            >
              {product.status === "Sold"
                ? "Out of Stock"
                : `Add ${quantity} ${product.unitType} to Cart`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
