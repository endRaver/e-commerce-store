import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  logout: async () => {

    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },
}));

// TODO: Implement the axios interceptor to refresh the token when it expires
