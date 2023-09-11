import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './navbar';

const Slider = ({ movies, handlesearch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === movies.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, movies.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex w-full">
        <div className="w-full flex flex-col justify-between">
        {movies.slice(0, 5).map((movie, index) => (
            <div
              key={index}
              className={`w-full relative flex flex-col  top-0 left-0 ${
                index === currentIndex ? '' : 'hidden'
              }`}
            >
              <div
                className="bg-cover bg-center  w-full bg-red-400 h-[40em]"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
              >
                <div className="w-full m-auto h-full justify-between flex flex-col bg-opacity-70 bg-black z-50 ">
      <div className="sticky w-full z-50 top-0">
        <Navbar handlesearch={handlesearch}/>
        </div>
<div className="flex sm:flex-row flex-col w-full justify-between m-auto">
                <div className="flex w-[404px] flex-col h-full ml-8 justify-center text-white">
                  <h1 className="text-4xl block align-baseline justify-start font-bold mb-4">{movie.title}</h1>
                  <p className="mb-8">{movie.overview}</p>
                  <button className="rounded-[6px] flex items-center justify-center w-fit p-2 bg-[#BE123C]">
                    <Image src='/Play.svg' alt='icon' width={30} height={30} />
                    Watch Now
                  </button>
                </div>
        <div className="w-fit flex-col flex justify-center pr-8 text-right items-end text-white">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`cursor-pointer float-right flex ${
                currentIndex === index - 1 ? 'pr-1 font-[700] text-[20px]' : ''
              }`}
              onClick={() => setCurrentIndex(index - 1)}
            >
              {currentIndex === index - 1 ? <span>-</span> : ''}{index}
            </div>
          ))}
        </div>
        </div>
              </div>
            </div>
        </div>
          ))
            }</div>
    </div>
    </div>
  );
};

export default Slider;
