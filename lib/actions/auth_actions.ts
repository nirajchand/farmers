"use server";

import { register, login } from "../api/auth";
import { setAuthToken, setUserData } from "../cookies";

export async function handleRegister(formData: any) {
  try {
    const result = await register(formData);
    console.log(result)
    if (result.success) {
      return {
        success: true,
        message: "Registration successFul",
        data: result.data,
      };
    }
    return { success: false, message: result.message || "Register Failed" };
  } catch (err: Error | any) {
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function handleLogin(loginFormData: any) {
  try {
    const response = await login(loginFormData);
    if (response.success) {
      await setAuthToken(response.token);
      await setUserData(response.data);
      return {
        success: true,
        message: "Login successful",
        data: response.data,
      };
    }
    return { success: false, message: response.message || "Login failed" };
  } catch (err: Error | any) {
    return {
      success: false,
      message: err.message,
    };
  }
}
