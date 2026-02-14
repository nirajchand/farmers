"use server";

import {
  createUser,
  deleteuserById,
  getAllUser,
  getConsumerById,
  getFarmerById,
  updateUser,
} from "@/lib/api/admin/user";
import { revalidatePath } from "next/cache";

export async function handleUserCreate(data: FormData) {
  try {
    const response = await createUser(data);
    if (response.success) {
      revalidatePath("/admin");
      return {
        success: true,
        message: "Registration successful",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || "Registration failed",
    };
  } catch (e: Error | any) {
    return { success: false, message: e.message || "User creation failed" };
  }
}

export async function handleGetAllUser(page: number, size: number) {
  try {
    const result = await getAllUser(page, size);
    if (result.success) {
      return {
        success: true,
        message: "All users fetched",
        data: result.data,
        pagination: result.pagination,
      };
    }
    return {
      success: false,
      message: result.message || "User fatching failed",
      data: [],
      pagination: null,
    };
  } catch (e: Error | any) {
    return { success: false, message: e.message || "Get users failed" };
  }
}
export async function handleGetConsumerById(userId: string) {
  try {
    const result = await getConsumerById(userId);
    if (result.success) {
      return {
        success: true,
        message: "Consumer fetched",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Consumer fatching failed",
      data: [],
    };
  } catch (e: Error | any) {
    return { success: false, message: e.message || "Get consumer failed" };
  }
}
export async function handleGetFarmerById(userId: string) {
  try {
    const result = await getFarmerById(userId);
    if (result.success) {
      return {
        success: true,
        message: "Consumer fetched",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Consumer fatching failed",
      data: [],
    };
  } catch (e: Error | any) {
    return { success: false, message: e.message || "Get consumer failed" };
  }
}

export async function handleDeleteUser(userId: string) {
  try {
    const result = await deleteuserById(userId);
    if (result.success) {
      return {
        success: true,
        message: "Consumer fetched",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Consumer fatching failed",
    };
  } catch (e: Error | any) {
    return { success: false, message: e.message || "Get consumer failed" };
  }
}

export async function handleUpdateUser(userId: string, data: any) {
  try {
    const result = await updateUser(userId, data);
    if (result.success) {
      return {
        success: true,
        message: "Profile updated",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "profile update Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "updated failed",
    };
  }
}
