import {
  getFarmerProfile,
  updateFarmerProfile,
} from "@/lib/api/farmer/FarmerProfile";

export async function handleGetFarmerProfile() {
  try {
    const profileData = await getFarmerProfile();
    if (profileData.success) {
      return {
        success: true,
        message: "Profile data fetched",
        data: profileData.data,
      };
    }
    return {
      success: false,
      message: profileData.message || "profile fetching failed Failed",
    };
  } catch (error: Error | any) {
    return {
      success: false,
      message: error.message || "Get Profile failed",
    };
  }
}

export async function handleUpdateFarmerProfile(data: any) {
  try {
    const result = await updateFarmerProfile(data);
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


