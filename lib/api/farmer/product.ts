import axios from "../axios";
import { API } from "../endpoints";

export const addProduct = async (data: any) => {
  try {
    const reponse = await axios.post(API.FARMER.PRODUCTS.ADDPRODUCT, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Product add failed");
  }
};

export const getFarmersProduct = async () => {
  try {
    const reponse = await axios.get(API.FARMER.PRODUCTS.GETPRODUCTS);
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Product get failed");
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const reponse = await axios.delete(API.FARMER.PRODUCTS.DELETEPRODUCTS(productId));
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Product delete failed");
  }
};

export const getProductById = async (productId: string) => {
  try {
    const reponse = await axios.get(
      API.FARMER.PRODUCTS.GETPRODUCTBYID(productId),
    );
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Profile fetch failed");
  }
};



