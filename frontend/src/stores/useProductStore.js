import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
      toast.error("Failed to create product");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/category/${category}`);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== productId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
}));

