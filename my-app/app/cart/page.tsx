"use client";

import { useCart } from "@/contexts/CartContext";
import api from "@/utils/api";

const CartPage = () => {
  const { state, removeItem, updateQuantity } = useCart();

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return { items: [], total: 0 };
    }
  };

  const placeOrder = async () => {
    try {
      await api.post("/orders", { cartItems: state.items });
      alert("Order placed successfully!");

      // Refresh cart items by re-fetching from the API
      const updatedCart = await fetchCart();
      state.items.length = 0; // Clear existing items
      state.items.push(...updatedCart.items); // Update with new cart data
      state.total = updatedCart.total;
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          {state.items.map((item: any) => (
            <div key={item.productId._id} className="flex justify-between items-center border-b py-4">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button onClick={() => removeItem(item.productId._id)} className="text-red-500">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4 font-semibold">Total: ${state.total.toFixed(2)}</div>
          <button onClick={placeOrder} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
