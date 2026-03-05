"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, product } from "../schema";
import { startTransition, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { handleAddProduct } from "@/lib/actions/farmer/productActions";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(product),
  });
  const { user } = useAuth();

  const [fileName, setFileName] = useState("");

  const onSubmit = async (data: Product) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        // Append fields to form Data
        formData.append("farmerId", user._id);
        formData.append("productName", data.productName);
        formData.append("price", data.price.toString());
        formData.append("quantity", data.quantity.toString());
        formData.append("unitType", data.unitType);
        formData.append("status", data.status);
        formData.append("description", data.description);

        // Append image if present
        if (data.product_image && data.product_image.length > 0) {
          formData.append("product_image", data.product_image[0]);
        }

        console.log("Here is form data:", formData);

        const response = await handleAddProduct(formData);

        if (!response.success)
          throw new Error(response.message || "Product creation failed");

        reset();
        setFileName("");
        toast.success("Product created successfully");
      } catch (e: Error | any) {
        toast.error(e.message || "Product creation failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-[var(--card-bg)] shadow-2xl rounded-2xl p-8 border-t-4 border-[var(--primary)]">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">
            Add New Product
          </h2>
          <p className="text-[var(--secondary-foreground)]">Fill in the details to list your product</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input type="hidden" {...register("farmerId")} />

          {/* Product Name */}
          <div>
            <label className="label">Product Name</label>
            <input
              {...register("productName")}
              className="input"
              placeholder="Enter product name"
            />
            <p className="error">{errors.productName?.message}</p>
          </div>

          {/* Price + Quantity */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="input"
                placeholder="0.00"
              />
              <p className="error">{errors.price?.message}</p>
            </div>

            <div>
              <label className="label">Quantity</label>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="input"
                placeholder="0"
              />
              <p className="error">{errors.quantity?.message}</p>
            </div>
          </div>

          {/* Unit Type */}
          <div>
            <label className="label">Unit Type</label>
            <select {...register("unitType")} className="input">
              <option value="">Select Unit</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="piece">Piece</option>
              <option value="litre">Litre</option>
              <option value="dozen">Dozen</option>
            </select>
            <p className="error">{errors.unitType?.message}</p>
          </div>

          {/* Status */}
          <div>
            <label className="label">Status</label>
            <select {...register("status")} className="input">
              <option value="">Select Status</option>
              <option value="Growing">Growing</option>
              <option value="Ready">Ready</option>
              <option value="Sold">Sold</option>
            </select>
            <p className="error">{errors.status?.message}</p>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="input"
              placeholder="Write product details..."
            />
          </div>

          {/* Product Image Upload */}
          <div>
            <label className="label">Product Image</label>

            <Controller
              name="product_image"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files); // store the FileList
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                    className="hidden"
                    id="productImage"
                  />
                  <label
                    htmlFor="productImage"
                    className="input cursor-pointer flex justify-between items-center"
                  >
                    <span>{fileName || "Choose Image"}</span>
                  </label>
                </>
              )}
            />

            {/* Selected File Name + Cancel */}
            {fileName && (
              <div className="flex justify-between items-center mt-3 bg-[var(--primary-light)] border border-[var(--primary)] rounded-xl px-4 py-2">
                <span className="text-sm font-medium text-[var(--primary)]">{fileName}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFileName("");
                  }}
                  className="text-[var(--error)] font-bold text-lg hover:text-[var(--error)]/80 hover:cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <p className="error">{errors.product_image?.message?.toString()}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[var(--primary)] to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-[var(--primary-dark)] hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Save Product
          </button>
        </form>
      </div>

      <style jsx>{`
        .label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--primary);
        }
        .input {
          width: 100%;
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 12px 16px;
          outline: none;
          transition: all 0.3s ease;
          background-color: var(--input-bg);
          color: var(--foreground);
        }
        .input:focus {
          border-color: var(--primary);
          background-color: var(--card-bg);
          box-shadow: 0 0 0 3px rgba(21, 163, 5, 0.1);
        }
        .input:hover {
          border-color: var(--primary-light);
        }
        .error {
          color: var(--error);
          font-size: 13px;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
