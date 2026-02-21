import { addToCart, getCart, removeFromCart, updateCartItem } from "@/lib/api/farmer/cart";

export async function handleAddToCart(productId: string,quantity: number) {
  try {
    const result = await addToCart(productId, quantity);
    if (result.success) {
      return {
        success: true,
        message: "Added to cart",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "cart add Failed",
    };
  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "cart add failed",
    };
  }
}

export async function handleGetCart() {
  try {
    const result = await getCart();

    return {
      success: true,
      message: "Cart fetched",
      data: result, 
    };

  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "cart fetch failed",
    };
  }
}

export async function handleRemoveProduct(cartItemId: string) {
  try {
    const result = await removeFromCart(cartItemId);

    return {
      success: true,
      message: "item removed",
      data: result, 
    };

  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "Item remove failed",
    };
  }
}

export async function handleUpdateCartItem(cartItemId: string, quantity : number) {
  try {
    const result = await updateCartItem(cartItemId,quantity);
    return {
      success: true,
      message: "item updated",
      data: result, 
    };

  } catch (e: Error | any) {
    return {
      success: false,
      message: e.message || "Item update failed",
    };
  }
}