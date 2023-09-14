"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "./components/mobilenav";
import FeaturedMovie from "./components/featuredmovie";
import Slider from "./components/carousel";
import Footer from "./components/footer";

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Featured Movie');
  const [topTen, setTopten] = useState([]);
  const [sidebar, setsidebar] = useState(false)

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, []);

  useEffect(() => {
    // Fetch top 10 movies from TMDB API using environment variable
    const fetchTopMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&page=1`
        );
        const data = await response.json();
        setTopMovies(data.results);
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    };

    fetchTopMovies();
  }, []);

 

  const handlesearch = async (query) => {
    setLoading(true); // Set loading to true when starting the search
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
      );
      const data = await response.json();
      setTopMovies(data.results); // Set search results to topMovies state
      setText('Search results')
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 8000);
  
      return () => clearTimeout(timer); // Clean up timer on component unmount
    }
  };
  
  useEffect(() => {
    topMovies?
    setTopten(topMovies.slice(0, 10))
  : ''

  }, [topMovies])

  const showsidebar = (value) =>{
    setsidebar(value)
    console.log(value)
  }
  

  return (
    <div className="flex flex-col w-full min-h-screen relative ">
     {sidebar && <Sidebar handlesearch={handlesearch} showsidebar={showsidebar} />}
     <div className="relative w-full">
      </div> 
      <div className="w-full  flex h-fit mb-3">
        <Slider handlesearch={handlesearch} showsidebar={showsidebar} />
      </div>

      <div className="w-full flex flex-col ">
      <div className="flex w-full justify-between  px-8">
        <h1 className="font-[700] text-[1.5em]">
          {text}
        </h1>

        <div className="flex justify-between items-center w-fit">
          <a href="/movies" className="text-[#BE123C]">
            see more
          </a>
          <Image src="/arrowright.svg" alt="arrow" width={20} height={20} />
        </div>
      </div>
        <FeaturedMovie movies={topTen} loading={loading} text={text} />
      </div>
      <div className="justify-end flex-grow align-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
