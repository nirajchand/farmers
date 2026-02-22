import axiosInstance from "../axios";
import { API } from "../endpoints";

export const getFarmerOrders = async () => {
  try {
    const reponse = await axiosInstance.get(
      API.FARMER.ORDERS.GETORDERS,
    );
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "order get failed");
  }
};

export const updateOrderStatus = async (orderId: string, orderStatus: string) => {
  try {
    const reponse = await axiosInstance.patch(
      API.FARMER.ORDERS.UPDATESTATUS(orderId),{
        orderStatus
      }
    );
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "order status update failed");
  }
};