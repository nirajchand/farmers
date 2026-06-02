"use client";

import {
  handleGetCart,
  handleRemoveProduct,
  handleUpdateCartItem,
} from "@/lib/actions/farmer/CartActions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface CartItem {
  _id: string; // Cart item ID
  productName: string;
  price: number;
  unitType: string;
  quantity: number;
  product_image?: string;
}
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { refreshCart } = useCart();

  // Fetch cart on page load
  useEffect(() => {
    handleGetCartForUser();
  }, []);

  const handleGetCartForUser = async () => {
    try {
      const response = await handleGetCart();
      const mappedItems: CartItem[] = response.data.items.map((item: any) => ({
        _id: item._id, // Cart item ID
        productId: item.productId._id, // Product ID
        productName: item.productId.productName,
        price: item.productId.price,
        unitType: item.productId.unitType,
        quantity: item.quantity,
        product_image: item.productId.product_image,
      }));

      setCartItems(mappedItems);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleIncrement = async (cartItemId: string) => {
    const currentItem = cartItems.find((i) => i._id === cartItemId);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + 1;

    // Optimistic UI update
    setCartItems((items) =>
      items.map((item) =>
        item._id === cartItemId ? { ...item, quantity: newQuantity } : item,
      ),
    );

    const response = await handleUpdateCartItem(cartItemId, newQuantity);

    if (!response.success) {
      toast.error(response.message);

      // Revert if failed
      setCartItems((items) =>
        items.map((item) =>
          item._id === cartItemId
            ? { ...item, quantity: currentItem.quantity }
            : item,
        ),
      );
    }
  };

  const handleDecrement = async (cartItemId: string) => {
    const currentItem = cartItems.find((i) => i._id === cartItemId);
    if (!currentItem || currentItem.quantity <= 1) return;

    const newQuantity = currentItem.quantity - 1;

    setCartItems((items) =>
      items.map((item) =>
        item._id === cartItemId ? { ...item, quantity: newQuantity } : item,
      ),
    );

    const response = await handleUpdateCartItem(cartItemId, newQuantity);

    if (!response.success) {
      toast.error(response.message);

      setCartItems((items) =>
        items.map((item) =>
          item._id === cartItemId
            ? { ...item, quantity: currentItem.quantity }
            : item,
        ),
      );
    }
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      const response = await handleRemoveProduct(cartItemId);
      if (response.success) {
        setCartItems((items) =>
          items.filter((item) => item._id !== cartItemId),
        );
        toast.success("Item removed successfully");
        refreshCart();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to remove item");
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[var(--background)] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[var(--foreground)]">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-[var(--card-bg)] p-10 rounded-xl shadow text-center text-[var(--secondary-foreground)]">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-[var(--card-bg)] rounded-xl shadow p-6 flex gap-6 items-center"
                >
                  {/* Image */}
                  <div className="w-28 h-28 bg-[var(--secondary)] rounded-lg flex items-center justify-center">
                    {item.product_image ? (
                      <img
                        src={process.env.NEXT_PUBLIC_API_BASE_URL + item.product_image}
                        alt={item.productName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      "No Image"
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-[var(--foreground)]">
                      {item.productName}
                    </h2>
                    <p className="text-[var(--primary)] font-medium mt-1">
                      Rs. {item.price} / {item.unitType}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="w-8 h-8 bg-[var(--secondary)] rounded flex items-center justify-center"
                      >
                        −
                      </button>

                      <span className="font-medium">
                        {item.quantity} {item.unitType}
                      </span>

                      <button
                        onClick={() => handleIncrement(item._id)}
                        className="w-8 h-8 bg-[var(--secondary)] rounded flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right">
                    <p className="font-semibold text-[var(--foreground)]">
                      Rs. {item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => handleRemove(item._id)} // Use cart item _id
                      className="mt-3 text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-[var(--card-bg)] rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3 text-[var(--secondary-foreground)]">
                <span>Subtotal</span>
                <span>Rs. {totalAmount}</span>
              </div>

              <div className="flex justify-between mb-3 text-[var(--secondary-foreground)]">
                <span>Delivery</span>
                <span>Rs. 0</span>
              </div>

              <hr className="my-4 border-[var(--border)]" />

              <div className="flex justify-between font-bold text-lg text-[var(--foreground)]">
                <span>Total</span>
                <span>Rs. {totalAmount}</span>
              </div>

              <button
                className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3 rounded-lg font-semibold transition"
                onClick={() => {
                  router.push("/consumer/checkout");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
