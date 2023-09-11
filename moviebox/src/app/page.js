"use client";
import React, { useState, useEffect } from "react";
import MovieCard from "./components/moviecard";
import ReactLoading from "react-loading";
import FeaturedMovie from "./components/featuredmovie";
import Slider from "./components/carousel";

const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Featured Movie');

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
      setLoading(false); // Set loading back to false after the search is complete
    }
  };
  

  return (
    <div className="flex flex-col">
      <div className="w-full  flex">
        <Slider movies={trendingMovies} handlesearch={handlesearch} />
      </div>

      <div className="w-full flex">
        <FeaturedMovie movies={topMovies} loading={loading} text={text} />
      </div>
    </div>
  );
};

export default HomePage;
