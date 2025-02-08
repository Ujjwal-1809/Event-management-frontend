import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useEventStore = create((set) => ({
  events: [],
  isCreatingEvent: false,
  selectedEvent: null,
  isLoadingEvent: false,

  // Create an Event
  createEvent: async (eventData) => {
    try {
      set({ isCreatingEvent: true });
      const res = await axiosInstance.post("/events", eventData, {
        headers: { "Content-Type": "application/json" }, // Send JSON
      });

      set((state) => ({ events: [...state.events, res.data] }));
      toast.success("Event created successfully!");
    } catch (error) {
      console.error("Error in create event store", error);
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      set({ isCreatingEvent: false });
    }
  },

  // Get All Events
  getEvents: async () => {
    try {
      const res = await axiosInstance.get("/events");
      set({ events: res.data }); // Update state with fetched events
    } catch (error) {
      console.error("Error in get events store", error);
      toast.error(error.response?.data?.message || "Failed to fetch events");
    }
  },

  // Get a Single Event by ID
  getEventById: async (eventId) => {
    try {
      set({ isLoadingEvent: true });
      const res = await axiosInstance.get(`/events/${eventId}`);
      set({ selectedEvent: res.data });
    } catch (error) {
      console.error("Error fetching event:", error);
      toast.error(error.response?.data?.message || "Failed to fetch event");
    } finally {
      set({ isLoadingEvent: false });
    }
  },
  deleteEvent: async (eventId) => {
    try {
        const res = await axiosInstance.delete(`/events/${eventId}`);

        toast.success(res.data.message || "Event deleted successfully!");

        set((state) => ({
            events: state.events.filter((event) => event._id !== eventId),
            selectedEvent: null, // Clear selected event
        }));
    } catch (error) {
        console.error("Error deleting event:", error);
        toast.error(error.response?.data?.message || "Failed to delete event");
    }
},

}));