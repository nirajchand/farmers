import { getAllProducts, getProductById } from "@/lib/api/consumer/product";



export async function handleGetAllProducts(page: number,size: number, search? : string) {
  try {
    const result = await getAllProducts(page, size,search);
    if (result.success) {
      return {
        success: true,
        message: "Products fetched",
        data: result.data,
        pagination: result.pagination
      };
    }
    return {
      success: false,
      message: result.message || "products fetch Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "products fetch failed",
    };
  }
};


export async function handleGetProductById(productId: string) {
  try {
    const result = await getProductById(productId);
    if (result.success) {
      return {
        success: true,
        message: "Product fetched",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "product fetch Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "product fetch failed",
    };
  }
};

