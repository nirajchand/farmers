import { getConsumerProfile, updateConsumerProfile } from "@/lib/api/consumer/ConsumerProfile";

export async function handleConsumerGetProfile() {
  try {
    const result = await getConsumerProfile();
    if (result.success) {
      return {
        success: true,
        message: "Profile data fetched",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "profile fetching failed Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "Data not found",
    };
  }
}


export async function handleUpdateConsumerProfile(data: any) {
  try {
    const result = await updateConsumerProfile(data);
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
