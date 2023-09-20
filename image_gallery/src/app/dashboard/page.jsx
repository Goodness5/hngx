"use client"
import React, {useEffect} from 'react'
import Dashboard from './components/dashboard'
import ImageGallery from './components/Imagegallery'
import Navbar from '../components/Navbar'
import { useTheme } from 'next-themes'

const Page = () => {
  const { theme, setTheme } = useTheme('');
  useEffect(() => {
    const userToken = sessionStorage.getItem('token');

    if (!userToken) {
      window.location.href = '/accounts/login'; 
    }
  }, []); 

  return (
    <div className={`container mx-auto p-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#08f34b15]'}`}>
      <Navbar />
      <Dashboard />
      <ImageGallery />
    </div>
  )
}

export default Page