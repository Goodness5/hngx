"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = ({ showsidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebar, setsidebar] = useState(false)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    showsidebar(true)
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handlesearch(searchQuery);
  };
  return (
    <nav className="flex">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center justify-center align-middle gap-2">

        <Image className="w-10 h-10" src="/logo.svg" width={40} height={40} alt="Logo" />
        <h1 className="text-black text-2xl font-bold ml-3">MovieBox</h1>
        </div>

        

        <div className="text-white flex items-center gap-4">
         

          
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
