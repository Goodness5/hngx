"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = ({handlesearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search Query:', searchQuery);
    // Implement your search functionality here
    handlesearch(searchQuery)
  };

  return (
    <nav className="p-5">
      <div className="container mx-auto flex justify-between items-center">
        <Image className="w-10 h-10" src="/logo.svg" width={40} height={40} alt="Logo" />
        <h1 className="text-white text-2xl font-bold ml-3">MovieBox</h1>
        
        <div className="flex  border-2 border-white rounded-[6px] w-[40%]">
           <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="What do you want to watch?"
            className="w-full bg-transparent p-2 focus:outline-none"
          />

          <Image src='/searchicon.svg' alt='Search' width={20} height={20} onClick={handleSearchSubmit} />
         
          </div> 
       
        <div className="text-white text-base font-bold leading-normal ml-8">Sign in</div>
        <div className="w-9 h-9 relative ml-2">
        <Image className="w-10 h-10" src="/menu.svg" width={40} height={40}  alt="menu" />
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
