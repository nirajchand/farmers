import { getFarmerOrders, updateOrderStatus } from "@/lib/api/farmer/order";

export async function handleGetFarmerOrder() {
  try {
    const result = await getFarmerOrders();
    if (result.success) {
      return {
        success: true,
        message: "order fetched",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "order fetch Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "order fetch failed",
    };
  }
}

export async function handleUpdateOrderStatus(
  orderId: string,
  newStatus: string,
) {
  try {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      return {
        success: true,
        message: "Order status updated",
      };
    }
    return {
      success: false,
      message: result.message || "Status update failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "Status update failed",
    };
  }
}
