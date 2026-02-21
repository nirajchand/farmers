import axios from "../axios";
import { API } from "../endpoints";

export const addToCart = async (productId: string, quantity: number) => {
  try {
    const response = await axios.post(
      API.CONSUMER.CART.ADDTOCART,
      { productId, quantity }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Cart add failed");
  }
};


export const getCart = async () => {
  try {
    const response = await axios.get(
      API.CONSUMER.CART.GETCART
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Cart get failed");
  }
};

export const removeFromCart = async (cartItemId: string) => {
  try {
    const response = await axios.delete(
      API.CONSUMER.CART.REMOVEFROMCART(cartItemId)
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Item delete failed");
  }
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  try {
    const response = await axios.put(
      API.CONSUMER.CART.UPDATECARTITEM,{
        cartItemId,quantity
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Item update failed");
  }
};