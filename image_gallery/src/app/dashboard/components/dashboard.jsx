"use client"
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [username, setUsername] = useState('');

useEffect(() => {
  const storedUsername = sessionStorage.getItem('username');
  if (storedUsername) {
    setUsername(storedUsername);
  }
}, []);

  return (
    <div className="flex items-center justify-center flex-col mt-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl items-center text-center font-bold mb-4"
      >
        Welcome to Your Gallery: {username}
      </motion.h1>

      {/* <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="mt-8"
      >
      <Link
        to="imageGallery"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Jump to Image Gallery
      </Link>
      </motion.button> */}
    </div>
  );
};

export default Dashboard;
