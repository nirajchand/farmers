import { z } from "zod";

export const productDetails = z.object({
  farmerId: z.object({
    _id: z.string(),
    farmName: z.string(),
    farmLocation: z.string(),
    description: z.string(),
    phoneNumber: z.string(),
  }),
  productName: z.string().trim().min(1, "Product name is required"),
  price: z.number().positive("Price must be greater than 0"),
  unitType: z.enum(["kg", "piece", "litre", "dozen"]),
  status: z.enum(["Growing", "Ready", "Sold"]),
  quantity: z.number().nonnegative("Quantity cannot be negative"),
  description: z.string().trim(),
  product_image: z.string().optional(),
  updatedAt: z.string().optional(),
  _id: z.string().optional(),
});

export type ProductDetails = z.infer<typeof productDetails>;
