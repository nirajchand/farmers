"use server";

import { createUser } from "@/lib/api/admin/user";
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
