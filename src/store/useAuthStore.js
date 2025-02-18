import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data });

        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data })
            toast.success("Account created successfully");

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signup", error);
        }
        finally{
            set({ isSigningUp: false })
        }
    },

    login: async(data) => {
set({ isLoggingIn: true })
try {
    const res = await axiosInstance.post('/auth/login', data)
    set({ authUser: res.data })
    toast.success("Logged In successfully");

} catch (error) {
    toast.error(error.response.data.message)
}
finally{
    set({ isLoggingIn: false })
}
    },

    logout: async() => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged Out Successfully");

        } catch (error) {
         toast.error("Failed to logout")   
        }
    },
    guestLogin: () => {
        set({
          authUser: { _id: "guest", name: "Guest User", isGuest: true },
        });
        toast.success("Logged in as Guest!");
      },
}))