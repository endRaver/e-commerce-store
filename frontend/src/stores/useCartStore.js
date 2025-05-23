import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error?.response?.data?.message || "Failed to fetch cart items");
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },
  
  addToCart: async (product) => {
    try {
      await axiosInstance.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id);
        const newCart = existingItem
          ? prevState.cart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add product to cart");
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axiosInstance.delete(`/cart`, { data: { productId } });
      toast.success("Product removed from cart");

      set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove product from cart");
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    try {
      await axiosInstance.put(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update quantity");
    }
  },

}));
