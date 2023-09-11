"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from './mobilenav';

const Navbar = ({ handlesearch, showsidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    showsidebar(!menuOpen)
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handlesearch(searchQuery);
  };
  return (
    <nav className="p-5 flex">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center justify-center align-middle gap-2">

        <Image className="w-10 h-10" src="/logo.svg" width={40} height={40} alt="Logo" />
        <h1 className="text-white text-2xl font-bold ml-3">MovieBox</h1>
        </div>

        
        <div className={`lg:flex hidden items-center border-2 border-white rounded-[6px] w-[40%] px-2 text-white`}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="What do you want to watch?"
            className="w-full bg-transparent p-2 focus:outline-none text-white"
          />
          <Image src='/searchicon.svg' alt='Search' width={20} height={20} onClick={handleSearchSubmit} />
        </div>
        

        <div className="text-white flex items-center gap-4">
         
          <button
            className={`hidden sm:block text-base font-bold leading-normal`}
          >
            Sign up
          </button>
          
          <Image
            className="w-10 h-10 "
            src="/menu.svg"
            width={40}
            height={40}
            alt="menu"
            onClick={toggleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
