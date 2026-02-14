import axiosInstance from "../axios";
import {API} from "../endpoints";

export const getConsumerProfile = async () => {
    try{
        const reponse  = await axiosInstance.get(API.CONSUMER.PROFILE.GETPROFILE);
        return reponse.data;
    }catch(e: Error | any){
        throw new Error(e.message || "Profile fetch failed")
    }
}

export const updateConsumerProfile = async (updatedData: any) => {
    try{
        const reponse  = await axiosInstance.put(API.CONSUMER.PROFILE.UPDATEPROFILE,updatedData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
        return reponse.data;
    }catch(e: Error | any){
        throw new Error(e.message || "Profile update failed")
    }
}