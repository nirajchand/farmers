import { addProduct, deleteProduct, getFarmersProduct } from "@/lib/api/farmer/product";

export async function handleAddProduct(data: any) {
  try {
    const result = await addProduct(data);
    if (result.success) {
      return {
        success: true,
        message: "Product added",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "product add Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "product add failed",
    };
  }
}


export async function handleGetFarmersProduct() {
  try {
    const result = await getFarmersProduct();
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

export async function handledeleteProduct(productId: string) {
  try {
    const result = await deleteProduct(productId);

    if (result.success) {
      return {
        success: true,
        message: "Product deleted",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "product delete Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "product fetch failed",
    };
  }
}


