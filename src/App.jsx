import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ViewEvent from './components/viewEvent';
import CreateEvent from './components/CreateEvent';

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) { // means till the time it is checked whether the user is authenticated or not, the loader should be displayed.
    return <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  }

  return <div>
    <Routes>

      <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
      <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
      <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
      <Route path='/dashboard' element={authUser ? <><Navbar /><Dashboard /></> : <Navigate to='/login' />} />
      <Route path='/create' element={authUser ? <><Navbar /><CreateEvent /></> : <Navigate to='/login' />} />
      <Route path='/event/:id' element={authUser ? <><Navbar /><ViewEvent /></> : <Navigate to='/login' />} />
    </Routes>

    <Toaster />
  </div>
} 
