"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/farmer/crops/schema";

export default function ViewProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      {/* Back Button */}
      <div className="w-full max-w-5xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-green-600 hover:text-green-800 font-semibold"
        >
          <span className="mr-2 text-2xl">←</span> Back
        </button>
      </div>

      <div className="max-w-5xl w-full bg-green-50 rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          {product.product_image ? (
            <img
              src={process.env.NEXT_PUBLIC_API_BASE_URL + product.product_image}
              alt={product.productName}
              width={450}
              height={450}
              className="rounded-xl object-cover shadow-md"
            />
          ) : (
            <div className="w-[450px] h-[450px] bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-3">
              {product.productName}
            </h1>

            <p className="text-2xl font-semibold text-green-600 mb-4">
              Rs. {product.price} / {product.unitType}
            </p>

            {/* Status + Stock */}
            <div className="flex gap-3 mb-4">
              <span
                className={`px-4 py-1 text-white rounded-full text-sm font-medium ${
                  product.status === "Ready"
                    ? "bg-green-600"
                    : product.status === "Growing"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              >
                {product.status}
              </span>

              <span className="bg-green-200 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                Stock: {`${product.quantity} ${product.unitType}`}
              </span>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Description
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
