"use client"
import React, {useEffect} from 'react'
import Dashboard from './components/dashboard'
import ImageGallery from './components/Imagegallery'
import Navbar from '../components/Navbar'

const Page = () => {

  useEffect(() => {
    const userToken = sessionStorage.getItem('token');

    if (!userToken) {
      window.location.href = '/accounts/login'; 
    }
  }, []); 

  return (
    <div>
      <Navbar />
      <Dashboard />
      <ImageGallery />
    </div>
  )
}

export default Page