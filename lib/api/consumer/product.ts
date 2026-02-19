import axios from "../axios";
import { API } from "../endpoints";

export const getProductById = async (productId: string) => {
  try {
    const reponse = await axios.get(
      API.CONSUMER.PRODUCTS.GETPRODUCTBYID(productId),
    );
    return reponse.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Profile fetch failed");
  }
};

export const getAllProducts = async (
  page: number,
  size: number,
  search?: string,
) => {
  try {
    const response = await axios.get(API.CONSUMER.PRODUCTS.GETPRODUCTS, {
      params: {
        page,
        size,
        search,
      },
    });
    return response.data;
  } catch (e: Error | any) {
    throw new Error(e.message || "Products fetched failed");
  }
};
