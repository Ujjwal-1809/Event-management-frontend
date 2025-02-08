import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full bg-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="h-[90vh] mt-16 relative w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="z-10 max-w-3xl px-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Discover & Attend Amazing Events!
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Join thousands of people attending events near you. Find, create, and manage events effortlessly.
          </p>
          <Link to="/dashboard">
            <button className="cursor-pointer mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-100 transition">
              Explore Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
