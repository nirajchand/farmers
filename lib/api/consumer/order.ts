import axiosInstance from "../axios";
import { API } from "../endpoints";

export const orderPlace = async (data: any) => {
  try {
    const reponse = await axiosInstance.post(
      API.CONSUMER.ORDER.PLACEORDER,
      data,
    );
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "order place failed");
  }
};
