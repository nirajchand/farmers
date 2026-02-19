import { handleGetProductById } from "@/lib/actions/consumer/products";
import ViewProductDetails from "../_components/view.product.details";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await params;

  const product = await handleGetProductById(productId);

  if (!product.success) {
    throw new Error(product.message || "Failed to load product");
  }

  if (!product.data) {
    throw new Error("No product found");
  }

  return <ViewProductDetails product={product.data} />;
}
