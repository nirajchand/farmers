"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/farmer/schema";

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
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 py-10">
      {/* Back Button */}
      <div className="w-full max-w-5xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold"
        >
          <span className="mr-2 text-2xl">←</span> Back
        </button>
      </div>

      <div className="max-w-5xl w-full bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10 border border-[var(--border)]">
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
            <div className="w-[450px] h-[450px] bg-[var(--primary-light)] rounded-xl flex items-center justify-center text-[var(--primary)]">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
              {product.productName}
            </h1>

            <p className="text-2xl font-semibold text-[var(--primary)] mb-4">
              Rs. {product.price} / {product.unitType}
            </p>

            {/* Status + Stock */}
            <div className="flex gap-3 mb-4">
              <span
                className={`px-4 py-1 text-white rounded-full text-sm font-medium ${
                  product.status === "Ready"
                    ? "bg-[var(--success)]"
                    : product.status === "Growing"
                      ? "bg-[var(--warning)]"
                      : "bg-[var(--error)]"
                }`}
              >
                {product.status}
              </span>

              <span className="bg-[var(--primary-light)] text-[var(--primary)] px-4 py-1 rounded-full text-sm font-medium">
                Stock: {`${product.quantity} ${product.unitType}`}
              </span>
            </div>

            {/* Description */}
            <div className="bg-[var(--secondary)] p-4 rounded-lg border border-[var(--border)] shadow-sm">
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">
                Description
              </h3>
              <p className="text-[var(--secondary-foreground)] text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
