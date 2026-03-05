"use server";

import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} from "../api/auth";
import { setAuthToken, setUserData } from "../cookies";

export async function handleRegister(formData: any) {
  try {
    const result = await register(formData);
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

export const handleRequestPasswordReset = async (email: string) => {
  try {
    const response = await requestPasswordReset(email);
    if (response.success) {
      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Request password reset failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Request password reset action failed",
    };
  }
};

export const handleResetPassword = async (
  token: string,
  newPassword: string,
) => {
  try {
    const response = await resetPassword(token, newPassword);
    if (response.success) {
      return {
        success: true,
        message: "Password has been reset successfully",
      };
    }
    return {
      success: false,
      message: response.message || "Reset password failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Reset password action failed",
    };
  }
};
