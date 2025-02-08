import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventStore } from "../store/useEventStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const ViewEvent = () => {
    const { id } = useParams(); // Get event ID from URL
    const { selectedEvent, getEventById, isLoadingEvent, deleteEvent } = useEventStore();
const { authUser } = useAuthStore();
const navigate = useNavigate();

    useEffect(() => {
        getEventById(id); // Fetch event on mount
    }, [id, getEventById]);

    const handleDelete = async () => {
        if (!authUser) {
            return toast.error("You need to be logged in to delete an event.");
        }
    
        await deleteEvent(id); 
        navigate("/dashboard"); // Redirect after successful deletion
    };
    

    if (isLoadingEvent) return <p>Loading...</p>;
    if (!selectedEvent) return <p>Event not found</p>;

    return (
        <div className='w-full flex justify-center items-center mt-18 p-7'>
            <div className=" bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%]">
                <img className="w-full h-64 object-cover rounded-md" src={selectedEvent.image} alt={selectedEvent.title} />
                <h2 className="text-3xl font-bold text-gray-900 mt-4">{selectedEvent.title}</h2>
                <p className="text-gray-600 text-lg mt-2">{selectedEvent.location}</p>
                <h3 className="text-indigo-600 font-semibold mt-2">
                    {new Date(selectedEvent.date).toLocaleDateString()}
                </h3>
                <p className="text-gray-700 mt-4">{selectedEvent.description}</p>
                <div className="flex w-full gap-x-5 mt-4">
                    <button className="w-36 p-2 text-white bg-indigo-500 rounded-lg shadow-sm cursor-pointer hover:bg-indigo-700"
                    >Join Event</button>
{authUser?._id === selectedEvent.createdBy?._id && (
            <button
              className="w-36 p-2 text-white bg-red-500 rounded-lg shadow-sm cursor-pointer hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
                </div>
                <h3 className="text-end p-1 rounded-sm ">Created by: {selectedEvent.createdBy?.username || "Unknown"}
                </h3>
            </div>
        </div>
    );
};

export default ViewEvent;

