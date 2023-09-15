"use client";
import React, { useState, useEffect } from "react";
import Sidepane from "../components/sidepane";
import Image from "next/image";
import Navbar from "../components/navbar";
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

const MoviePage = ({ params }) => {
  const id = params.id;
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [topRatedPosition, setTopRatedPosition] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);
  const [sidebar, setsidebar] = useState(true)
  const [rating, setRating] = useState(2);


   useEffect(() => {
    const handleResize = () => {
      setsidebar(window.innerWidth > 768); 
    };

    // Set the initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRatingChange = (newRating) => {
    if (newRating == 1) {
      // If the user clicked on the same star, unrate it
      setRating(0);
    } else {
      // Otherwise, set the new rating
      setRating(newRating);
    }
  };

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
  const releaseDate = new Date(movieDetails.release_date);
  releaseDate.setMinutes(releaseDate.getMinutes() + releaseDate.getTimezoneOffset());
const utcReleaseDate = releaseDate.getUTCFullYear();


const formatRuntime = (minutes) => {
  return `${minutes}m`;
};

  const formatVoteCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  const showsidebar = (value) =>{
    setsidebar(value)
    console.log(value)
  }
  const runtime = movieDetails.runtime;
  const formattedRuntime = formatRuntime(runtime);

  return (
    <div className="w-full  bottom-0 h-fit flex gap-4 pb-8">
      {sidebar && 
      <div className="sm:w-[20%] bg-white fixed sm:sticky rounded-tr-[45px] z-[100] border h-full top-0 bottom-0 rounded-br-[45px]">
        <Sidepane showsidebar={showsidebar} />
      </div>
}
      <div className="flex-col flex w-full  sm:px-8 p-2 sm:py-4">
      <div className="sm:hidden mb-1 sticky top-0 p-2 z-[90] rounded-md bg-[#00000060]">
        <Navbar showsidebar={showsidebar} />
      </div>
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

        <div className="w-full text-[#404040] font-[500] text-[1.2em] sm:flex-col flex flex-col p-2 gap-3 mt-8">
            <div className="w-full sm:flex-row flex-col flex gap-4 justify-between sm:items-center sm:text-center">
              <div className="sm:flex-row gap-4 flex flex-col w-full sm:gap-2 sm:items-center sm:text-center justify-start items-start text-start sm:align-middle">

              <h1 data-testid='movie-title' className="text-[1.1em] sm:w-fit w-full gap-2 flex-col sm:flex-row font-[700] flex">
                {movieDetails.title}
                <span className="flex w-full  gap-4 sm:hidden">
                  
                {movieDetails.genres.map((genre) => (
                <p
                  key={genre.id}
                  className="rounded-full px-3 sm:hidden border text-[#B91C1C] text-[0.9em] items-center text-center p-1 w-fit h-fit border-[#F8E7EB]"
                >
                  {genre.name}
                </p>
              ))}
                </span>

              </h1>
                <span className="font-bold w-fit  text-2xl hidden sm:block">&#8226;</span>
              <span className="flex w-full sm:w-fit sm:gap-2 items-center text-center sm:justify-center justify-between">

              <p className="text-[1.1em] font-[700] flex gap-2" data-testid='movie-release-date' >
                {utcReleaseDate} 
              </p>
                <span className="font-bold text-2xl hidden sm:block">&#8226;</span>
              <p className="text-[1.1em] font-[700] flex gap-2">
              </p>
                PG-<span className="font-bold text-2xl hidden sm:block">&#8226;</span>
              <p className="text-[1.1em] font-[700]" data-testid='movie-runtime'>{formattedRuntime}</p>
              </span>

              {movieDetails.genres.map((genre) => (
                <p
                  key={genre.id}
                  className="rounded-full hidden sm:flex px-3 border text-[#B91C1C] text-[0.9em] items-center text-center p-1 w-fit h-fit border-[#F8E7EB]"
                >
                  {genre.name}
                </p>
              ))}
              </div>


              <div className="rating flex gap-2 text-[#666666] items-center align-middle justify-center">
            {/* <Image src='/Star.svg' alt="icon" width={30} height={30} />  */}
            <div className="flex">
            <Rating
        initialRating={rating}
        stop={1} 
        emptySymbol={<div style={{ color: '#00000040' }}><FaStar /></div>}
        fullSymbol={<div style={{ color: 'gold' }}><FaStar /></div>}
        onChange={handleRatingChange}
        className="flex"
      />
      </div>
            <p className="text-[#66666680]">{movieDetails.vote_average.toFixed(1)}</p>
            <span className="font-[900]">&#124;</span>
            <p className="text-[#666666]">{formatVoteCount(movieDetails.vote_count)}</p>

            </div>
            </div>


            <div className="sm:flex-row flex flex-col gap-6 w-full">
          <div className=" w-full flex-col flex gap-4">

            <p className="text-[1em]" data-testid='movie-overview'>{movieDetails.overview}</p>
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
              <div className="border flex text-sm rounded-l-md sm:text-[1em] justify-between w-full rounded-r-md ">
              <p className="bg-[#B91C1C] w-1/2 sm:w-auto sm:p-3 flex text-[#fff] p-2 rounded-md" style={{ whiteSpace: 'nowrap' }}>
  Top rated movie #{topRatedPosition}
</p>

                
               <p className="flex w-full ml-4  justify-between items-center text-center">
                 Awards 9 nominations <Image src='/arrowdown.svg' alt="icon" width={30} height={30} /> 
                </p>
                 </div>
            </div>
          </div>

          <div className="second w-full sm:w-[60%] sm:p-4 sm:mt-0 mt-10 font-[500]">
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
