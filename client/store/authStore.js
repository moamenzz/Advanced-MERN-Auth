import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isAuthenticated: false,
  isCheckingAuthentication: true,
  isLoading: false,

  signup: async (email, user, pwd) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post("/register", {
        email,
        user,
        pwd,
      });
      set({
        isLoading: false,
        isAuthenticated: true,
        user: response.data.user,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post("/verify", {
        code,
      });
      set({
        isLoading: false,
        isAuthenticated: true,
        user: response.data.user,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying Email",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, pwd, setAuth) => {
    set({ isLoading: true, error: null });
    // try {
    //   const response = await axiosInstance.post("/auth", {
    //     email,
    //     pwd,
    //   });
    //   console.log(response?.data);
    //   const accessToken = response.data.accessToken;
    //   const roles = response.data.roles;
    //   await setAuth({ email, pwd, roles, accessToken });
    //   // console.log(auth);
    //   console.log(accessToken);
    //   console.log(roles);
    //   set({
    //     isLoading: false,
    //     isAuthenticated: true,
    //     user: response.data.user,
    //   });
    // } catch (error) {
    //   set({
    //     error: error.response.data.message || "Incorrect credentials",
    //     isLoading: false,
    //   });
    //   throw error;
    // }
  },

  fetchUserData: async () => {
    set({ isCheckingAuthentication: true, user: null });

    try {
      const response = await axiosInstance.get("/fetch-user");
      set({
        isAuthenticated: true,
        isCheckingAuthentication: false,
        user: response.data.user,
      });
    } catch (e) {
      console.error(e.message);
      set({
        isAuthenticated: false,
        isCheckingAuthentication: false,
        error: null,
      });
    }
  },
}));
