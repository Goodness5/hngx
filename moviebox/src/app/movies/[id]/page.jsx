"use client";
import React, { useState, useEffect } from "react";
import Sidepane from "../components/sidepane";
import Image from "next/image";

const MoviePage = ({ params }) => {
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [topRatedPosition, setTopRatedPosition] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(`Error fetching details for movie with ID ${id}:`, error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovieCredits(data);
      } catch (error) {
        console.error(`Error fetching credits for movie with ID ${id}:`, error);
      }
    };

    function getRandomElements(arr, num) {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    }
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        const randomMovies = getRandomElements(data.results, 3);
        setRandomMovies(randomMovies);
        const movieIndex = data.results.findIndex(movie => movie.id === parseInt(id));
        setTopRatedPosition(movieIndex + 1);
      } catch (error) {
        console.error(`Error fetching top-rated movies:`, error);
      }
    };

    if (id) {
      fetchMovieDetails();
      fetchMovieCredits();
      fetchTopRatedMovies();
    }
  }, [id]);

  if (!movieDetails || !movieCredits || topRatedPosition === null) {
    return <div>Loading...</div>;
  }

  const imdbTitle = movieDetails.imdb_id;
  const imdbGalleryLink = `http://m.imdb.com/title/${imdbTitle}/videogallery`;
  const year = new Date(movieDetails.release_date).getFullYear();

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  const formatVoteCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  const runtime = movieDetails.runtime;
  const formattedRuntime = formatRuntime(runtime);

  return (
    <div className="w-full  bottom-0 h-fit flex gap-4 ">
      <div className="w-[20%] hidden sm:block rounded-tr-[45px] border h-full sticky top-0 bottom-0 rounded-br-[45px]">
        <Sidepane />
      </div>
      <div className="flex-col flex w-full  px-8 py-4">
        <div className="flex flex-col items-center w-full">
          <a
            href={imdbGalleryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <div
              className="flex items-center w-full h-[30em] bg-cover bg-center rounded-[20px]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})`,
              }}
            >
              <div className="m-auto rounded-full p-4 bg-[#ffffff6e]">
                <Image
                  src="/Play.svg"
                  alt={movieDetails.title}
                  className=""
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </a>
        </div>

        <div className="w-full text-[#404040] font-[500] text-[1.2em] flex flex-col p-2 gap-3 mt-8">
            <div className="w-full flex gap-4 justify-between items-center text-center">
              <div className="flex gap-2 justify-between items-center text-center align-middle">

              <h1 className="text-[1.1em] font-[500]">
                {movieDetails.title}
              </h1>
                <span className="font-bold text-2xl">&#8226;</span>
              <p className="text-[1.1em] font-[500]">
              </p>
                {year} <span className="font-bold text-2xl">&#8226;</span>
              <p className="text-[1.1em] font-[500]">
              </p>
                PG-<span className="font-bold text-2xl"> &#8226;</span>
              <p className="text-[1.1em] font-[500]">{formattedRuntime}</p>

              {movieDetails.genres.map((genre) => (
                <p
                  key={genre.id}
                  className="rounded-full px-3 border text-[#B91C1C] text-[0.9em] items-center text-center p-1 w-fit h-fit border-[#F8E7EB]"
                >
                  {genre.name}
                </p>
              ))}
              </div>
              <div className="rating flex gap-2 text-[#666666] items-center align-middle justify-center">
            <Image src='/Star.svg' alt="icon" width={30} height={30} /> 
            <p className="text-[#66666680]">{movieDetails.vote_average.toFixed(1)}</p>
            <span className="font-[900]">&#124;</span>
            <p className="text-[#666666]">{formatVoteCount(movieDetails.vote_count)}</p>

            </div>
            </div>


            <div className="flex gap-6 w-full">
          <div className=" w-full flex-col flex gap-4">

            <p className="text-[20px]">{movieDetails.overview}</p>
            <p className="text-[#B91C1C]">
              <span className="text-[#333333]"> Director:{" "}</span>
              {movieCredits.crew
                .filter((person) => person.job === "Director")
                .map((person) => person.name)
                .join(", ")}
            </p>
            <p className="text-[#B91C1C]">
              <span className="text-[#333333]"> Writers:{" "}</span>
              {movieCredits.crew
                .filter((person) => person.department === "Writing")
                .map((person) => person.name)
                .join(", ")}
            </p>
            <p className="text-[#B91C1C]">
              <span className="text-[#333333]"> Stars:{" "}</span>
              {movieCredits.cast
                .slice(0, 5)
                .map((person) => person.name)
                .join(", ")}
            </p>

            <div className="flex text-[1em]">
              <div className="bg-[#B91C1C] w-[50%] flex text-[#fff] rounded-md px-2 py-2">Top rated movie #{topRatedPosition}</div>
              <div className="border flex justify-between w-full rounded-r-md py-2 px-2">Awards 9 nominations <Image src='/arrowdown.svg' alt="icon" width={30} height={30} /> </div>
            </div>
          </div>

          <div className="second w-[60%] p-4">
           <div className="flex flex-col gap-4">
            <button className="flex bg-[#BE123C] w-full m-auto rounded-lg p-3 text-white items-center justify-center gap-4">
            <Image src='/showtimes.svg' alt="icon" width={30} height={30} /> 
                See Showtimes
            </button>
            <button className="flex bg-[#be123d2c] border border-[#BE123C] w-full m-auto rounded-lg p-3 items-center justify-center gap-4">
            <Image src='/List.svg' alt="icon" width={30} height={30} /> 
            More watch options
            </button>
           </div>

           <div className="flex h-[60%] w-full flex-col relative rounded-lg overflow-clip mt-4">
            <div className="flex h-full">

           {randomMovies.map((movie) => (
              <div key={movie.id} className="flex ">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  // layout="fill"
                  // objectFit="cover"
                  width={400}
                  height={400}
                  className=""
                />
              </div>
            ))}
            </div>
             <button className="flex text-[14px] gap-2 py-3 absolute bottom-0 bg-[#000000d0] z-50 w-full m-auto items-center justify-center text-[#E8E8E8]">
            <Image src='/List2.svg' alt="icon" width={30} height={30} /> 
            The Best Movies and Shows in September
            </button>
           </div>
          </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
