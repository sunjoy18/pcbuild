"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import type { CartItem, Product } from "@/types/product";
import api from "@/utils/api";

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "SET_CART"; payload: CartState }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } };

const CartContext = createContext<{
  state: CartState;
  addItem: (cartItem: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price * action.payload.quantity,
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        total: state.total - (state.items.find((item) => item._id === action.payload)?.price || 0),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
        total:
          state.total +
          (state.items.find((item) => item._id === action.payload.id)?.price || 0) *
            (action.payload.quantity -
              (state.items.find((item) => item._id === action.payload.id)?.quantity || 0)),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Fetch cart from the backend on load
  useEffect(() => {
    async function fetchCart() {
      try {
        const { data } = await api.get("/cart/");
        dispatch({ type: "SET_CART", payload: data });
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    }

    fetchCart();
  }, []);
  console.log("state : ", state);

  // Add item to cart (Backend Sync)
  const addItem = async (product: Product) => {
    try {
      await api.post("/cart/add", { productId: product._id });
      const cartItem: CartItem = { _id: product._id, productId: product, name: product.name, price: product.price, quantity: 1 };
      dispatch({ type: "ADD_ITEM", payload: cartItem });
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  // Remove item from cart (Backend Sync)
  const removeItem = async (productId: string) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      dispatch({ type: "REMOVE_ITEM", payload: productId });
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  // Update item quantity (Backend Sync)
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await api.put("/cart/update", { productId, quantity });
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
