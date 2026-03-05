"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleGetCart } from "@/lib/actions/farmer/CartActions";
import { handleOrderPlace } from "@/lib/actions/consumer/order.action";

interface CartItem {
  _id: string;
  productName: string;
  price: number;
  unitType: string;
  quantity: number;
  product_image?: string;
}

export default function CheckoutPage() {
  const [shippingAddress, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Online">("COD");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await handleGetCart();
        const mappedItems = response.data.items.map((item: any) => ({
          _id: item._id,
          productName: item.productId.productName,
          price: item.productId.price,
          unitType: item.productId.unitType,
          quantity: item.quantity,
          product_image: item.productId.product_image,
        }));
        setCartItems(mappedItems);
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch cart");
      }
    };
    fetchCart();
  }, []);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!shippingAddress || cartItems.length === 0) {
      toast.error("Please fill all required fields and have items in cart");
      return;
    }

    try {
      const payload = {
        shippingAddress,
        paymentMethod,
      };

      const response = await handleOrderPlace(payload);

      if (response.success) {
        toast.success("Order placed successfully!");
        setCartItems([]); // clear cart locally (optional)
        setAddress(""); // reset form
        setPaymentMethod("COD");
      } else {
        toast.error(response.message || "Order failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[var(--foreground)]">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Delivery Form */}
          <div className="bg-[var(--card-bg)] rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Delivery Address
            </h2>

            <textarea
              placeholder="Address"
              value={shippingAddress}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-[var(--border)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--input-bg)] text-[var(--foreground)]"
            />

            {/* Payment Method */}
            <div className="mt-4">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                Payment Method
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={() => setPaymentMethod("Online")}
                  />
                  Esewa/Khalti
                </label>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3 rounded-lg font-semibold transition"
            >
              Place Order
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-[var(--card-bg)] rounded-xl shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between mb-3 border-b border-[var(--border)] pb-2"
              >
                <div>
                  {item.productName} x {item.quantity}
                </div>
                <div>Rs. {item.price * item.quantity}</div>
              </div>
            ))}

            <div className="flex justify-between mb-3 font-semibold text-[var(--foreground)]">
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
          </div>
        </div>
      </div>
    </div>
  );
}
