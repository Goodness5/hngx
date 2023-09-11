import React, { useState } from 'react';
import Image from 'next/image';
const Sidebar = ({ handlesearch, showsidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handlesearch(searchQuery);
    close();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const close = () =>{
    showsidebar(false)
  }

  return (
    <div
      className={`fixed sm:hidden top-0  h-full z-50 transform ${showsidebar ? 'translate-x-0' : 'translate-x-full'} bg-[#180505ec] w-[60%] transition-transform ease-in-out duration-300 overflow-y-auto`}
    >
      <div className="flex justify-end p-4 w-full items-end">
        
        <button
          className="text-gray-600  hover:text-gray-800 transition"
          onClick={close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4 relative h-full">
      <div className={`items-center flex border-2 border-white rounded-[6px] w-full px-2 text-white`}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="What do you want to watch?"
            className="w-full bg-transparent p-2 focus:outline-none text-white"
          />
          <Image src='/searchicon.svg' alt='Search' width={20} height={20} onClick={handleSearchSubmit} />
        </div>

        <div className="justify-end bottom-[10%] absolute">
        <button className="px-4 py-2 bg-[#BE123C] text-white rounded">
          Sign up
        </button>

        </div>

      </div>
    </div>
  );
};

export default Sidebar;
