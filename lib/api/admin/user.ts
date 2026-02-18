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

export const getAllUser = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get(API.ADMIN.USER.GETALLUSERS,{
      params: {
        page,size
      }
    });
    return response.data;
  } catch (e: Error | any) {
    throw new Error(e.response.data.message || e.message || "Get user failed");
  }
};
export const getConsumerById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(
      API.ADMIN.USER.GETCONSUMERBYID(userId),
    );
    return response.data;
  } catch (e: Error | any) {
    throw new Error(e.response.data.message || e.message || "Get user failed");
  }
};

export const deleteuserById = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(
      API.ADMIN.USER.DELETEUSER(userId),
    );
    return response.data;
  } catch (e: Error | any) {
    throw new Error(e.response.data.message || e.message || "Get user failed");
  }
};

export const getFarmerById = async (userId: string) => {
  try {
    const response = await axiosInstance.get(
      API.ADMIN.USER.GETFARMERBYID(userId),
    );
    return response.data;
  } catch (e: Error | any) {
    throw new Error(e.response.data.message || e.message || "Get user failed");
  }
};
export const updateUser = async (userId: string, updatedData: any) => {
  try {
    const response = await axiosInstance.put(
      API.ADMIN.USER.UPDATEUSER(userId),
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (e: Error | any) {
    throw new Error(
      e.response.data.message || e.message || "update user failed",
    );
  }
};
