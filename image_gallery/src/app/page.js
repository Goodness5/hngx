
"use client"
import Navbar from './components/Navbar'
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const userToken = sessionStorage.getItem('token');

    if (!userToken) {
      window.location.href = '/accounts/login'; 
    }
    else{
      window.location.href = '/dashboard'
    }
  }, []); 
  return (
    <div>
< Navbar/>
    </div>
  )
}
