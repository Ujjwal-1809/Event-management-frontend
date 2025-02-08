import { useState } from "react";
import { useEventStore } from "../store/useEventStore.js";
import { Loader2 } from "lucide-react";

export default function CreateEvent() {

      const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: null
      });

      const { createEvent, isCreatingEvent } = useEventStore();

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.readAsDataURL(file);  // Convert file to Base64
    
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result }); // Save Base64 string
        };
    };    

      const handleSubmit = async (e) => {
        e.preventDefault();
        createEvent(formData); // Send JSON instead of FormData
      };

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    autoComplete="title"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    autoComplete="description"
                    className="block w-full h-20 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="date" className="block text-sm/6 font-medium text-gray-900">
                    Date
                  </label>
                  <div className="text-sm">
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="date" className="block text-sm/6 font-medium text-gray-900">
                    Location
                  </label>
                  <div className="text-sm">
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="image" className="block text-sm/6 font-medium text-gray-900">
                    Upload any image related to your event
                  </label>
                  <div className="text-sm">
                  </div>
                </div>
                <div className="mt-2">
                <input
    id="image"
    name="image"
    type="file"
    accept="image/*"
    onChange={handleFileChange}  // Use the new function
    className="block w-[30%] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
/>

                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="cursor-pointer flex w-[40%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isCreatingEvent}
                >
                 
                  {isCreatingEvent ? <Loader2 className="h-5 w-5 animate-spin"/> : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
