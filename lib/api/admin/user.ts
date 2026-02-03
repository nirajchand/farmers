import { API } from "../endpoints";
import axiosInstance from "../axios";
import { error } from "console";

export const createUser = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.ADMIN.USER.CREATE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e: Error | any) {
    throw new Error(
      e.response.data.message || e.message || "create user failed",
    );
  }
};
