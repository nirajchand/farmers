import { orderPlace } from "@/lib/api/consumer/order";

export async function handleOrderPlace(data: any) {
  try {
    const result = await orderPlace(data);
          console.log("here i get the data", result)

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
