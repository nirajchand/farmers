"use client"; // only if needed (Image works fine either way)

import { Product } from "@/app/farmer/crops/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function DashboardPage({
  products,
  pagination,
}: {
  products: Product[];
  pagination: any;
}) {
  const router = useRouter()
  return (
    <div className="p-20">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 text-green-600">Vegetables</h1>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
            >
              {/* Image */}
              <div className="w-full h-40 mb-4 overflow-hidden rounded-xl">
                <img
                  src={
                    process.env.NEXT_PUBLIC_API_BASE_URL + product.product_image
                  }
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-gray-600">Rs. {`${product.price} / ${product.unitType}`}</p>

              {/* Status Badge */}
              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                  product.status === "Growing"
                    ? "bg-blue-100 text-blue-700"
                    : product.status === "Ready"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {product.status}
              </span>

              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              onClick={()=>{
                router.push(`/consumer/${product._id}`)
              }}>
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        {pagination && (
          <>
            {/* Previous Button */}
            <Link
              href={`/consumer?page=${pagination.page - 1}&size=${pagination.size}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            pagination.page === 1
              ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
              : "border-green-200 text-green-700 hover:bg-green-50"
          }`}
            >
              ← Previous
            </Link>

            {/* Page Info */}
            <div className="px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-lg shadow-sm">
              Page {pagination.page} of {pagination.totalPages}
            </div>

            {/* Next Button */}
            <Link
              href={`/consumer?page=${pagination.page + 1}&size=${pagination.size}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            pagination.page === pagination.totalPages
              ? "pointer-events-none opacity-50 border-gray-200 text-gray-400"
              : "border-green-200 text-green-700 hover:bg-green-50"
          }`}
            >
              Next →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
