import axios from "../axios";
import { API } from "../endpoints";

export const getFarmerProfile = async () => {
  try {
    const profileData = await axios.get(API.FARMER.PROFILE.GETPROFILE);
    return profileData.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Can't get Profile");
  }
};

export const updateFarmerProfile = async (updatedData: any) => {
  try {
    const reponse = await axios.put(
      API.FARMER.PROFILE.UPDATEPROFILE,
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Profile update failed");
  }
};




