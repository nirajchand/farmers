import { getMyOrders, orderPlace } from "@/lib/api/consumer/order";

export async function handleOrderPlace(data: any) {
  try {
    const result = await orderPlace(data);

    if (result.success) {
      return {
        success: true,
        message: "order placed",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "order place Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "order place failed",
    };
  }
};

export async function handleGetMyOrder() {
  try {
    const result = await getMyOrders();
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
};
