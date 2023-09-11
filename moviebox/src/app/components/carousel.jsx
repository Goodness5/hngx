import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './navbar';
import CustomLoading from './loading';

const Slider = ({handlesearch, showsidebar }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([]);


  useEffect(() => {
    // Fetch trending movies from TMDB API using environment variable
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === 4) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex w-full">
        <div className="w-full flex flex-col justify-between">
        {trendingMovies? trendingMovies.map((movie, index) => (
            <div
              key={index}
              className={`w-full relative flex flex-col  top-0 left-0 ${
                index === currentIndex ? '' : 'hidden'
              }`}
            >
              <div
                className="bg-cover bg-center  w-full h-[40em]"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
              >
                <div className="w-full m-auto h-full justify-between flex flex-col bg-opacity-70 bg-black z-50 ">
      <div className="sticky w-full z-50 top-0">
        <Navbar handlesearch={handlesearch} showsidebar={showsidebar}/>
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
        <div className="sm:w-fit w-full sm:flex-col sm:gap-0 gap-8 sm:mt-0 mt-8  flex justify-center pr-8 text-right items-end text-white">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`cursor-pointer float-right flex ${
                currentIndex === index - 1 ? 'pr-1 font-[700] text-[20px]' : ''
              }`}
              onClick={() => setCurrentIndex(index - 1)}
            >
              {currentIndex === index - 1 ? <span className='hidden sm:block'>-</span> : ''}{index}
            </div>
          ))}
        </div>
        </div>
              </div>
            </div>
        </div>
          )): <div className="text-[#BE123C]">failed to fetch movies please try refreshing the page </div>
            }</div>
    </div>
    </div>
  );
};

export default Slider;
