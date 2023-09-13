import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidepane = ({showsidebar}) => {
  const pathName = usePathname();
  const activeTab = "border-r-[6px] border-[#BE123C]";


  const close = () =>{
    showsidebar(false)
  }
  return (
    <div 
    
    className={`transform ${showsidebar ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out duration-300 w-full h-full py-8 sticky top-0 gap-16 flex flex-col`}>
       <div className="flex sm:hidden justify-end p-4 w-full items-end">
        
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
      <div className="flex items-center justify-center align-middle gap-2 ">
        <Image
          className="w-10 h-10"
          src="/logo.svg"
          width={40}
          height={40}
          alt="Logo"
        />
        <h1 className="text-[#333333] text-2xl font-bold ml-3">MovieBox</h1>
      </div>

      <div className="list w-full flex flex-col">
        <Link
          href="/"
          className={`child flex p-4 items-center w-full  gap-4 ${pathName.includes(
            "/"
          )}`}
        >
          <div className="flex items-center ml-10 gap-3">
            <Image src="/homeicon.svg" alt="icon" width={30} height={30} />
            <p className="">Home</p>
          </div>
        </Link>
        <Link
          href="#"
          className={`child flex p-4 items-center w-full gap-4 ${
            pathName.includes("movies") ? `${activeTab} bg-[#FFE4E6]` : ""
          }`}
        >
          <div className="flex items-center ml-10 gap-3">
            <Image src="/movieicon.svg" alt="icon" width={30} height={30} />
            <p className="">Movies</p>
          </div>
        </Link>
        <Link
          href="#"
          className={`child flex p-4 items-center w-full gap-4 ${
            pathName.includes("tv") ? `${activeTab} bg-[#FFE4E6]` : ""
          }`}
        >
          <div className="flex items-center ml-10 gap-3">
            <Image src="/tvicon.svg" alt="icon" width={30} height={30} />
            <p className="">TV Series</p>
          </div>
        </Link>
        <Link
          href="#"
          className={`child flex p-4 items-center w-full gap-4 ${
            pathName.includes("upcoming") ? `${activeTab} bg-[#FFE4E6]` : ""
          }`}
        >
          <div className="flex items-center ml-10 gap-3">
            <Image src="/upcomingicon.svg" alt="icon" width={30} height={30} />
            <p className="">Upcoming</p>
          </div>
        </Link>
      </div>

      <div className="border rounded-[20px] border-[#BE123C] flex flex-col gap-4 items-center justify-center  py-4 w-[80%] mt-4 m-auto">
        <p className="text-[#333333] text-[15px] text-left leading-[18px] w-[90%] font-[600]">Play movie quizes and earn free tickets</p>
        <p className="text-[#666666] text-[12px] w-[90%] leading-[18px] font-medium ">50k people are playing now</p>

        <button className="bg-[#be123d38] text-[#BE123C] px-4 py-2 items-center flex rounded-[20px]">Start playing</button>
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center m-auto">
      <Image
              src="/Logout.svg"
              alt='logout'
              className=""
              width={30}
              height={30}
            />
            <p className="text-[20px] text-[#666666]">Logout</p>
      </div>
    </div>
  );
};

export default Sidepane;
