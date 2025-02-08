import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Plus } from "lucide-react";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              </div>
              <h1 className="text-lg font-bold">Event Manager</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">

 <Link to='/dashboard' className="bg-slate-200 rounded-md p-2 cursor-pointer hover:bg-slate-300">
               Dashboard
                </Link >
              
                <Link to='/create' className="flex gap-1 items-center cursor-pointer">
                  <span className="hidden sm:inline">Create Event</span>
                  <Plus className="size-5" />
                </Link>

                <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
                  <span className="hidden sm:inline">Logout</span>
                  <LogOut className="size-5" />
                </button>
            

          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;