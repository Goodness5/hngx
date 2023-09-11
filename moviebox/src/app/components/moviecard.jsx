import Image from "next/image";
import React, { useState, useEffect } from "react";

const MovieCard = ({ movie }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(`Error fetching details for ${movie.title}:`, error);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  const year = new Date(movie.release_date).getFullYear();

  return (
    <div>
      {details && (
        <div data-testid="movie-card" className="gap-2 flex flex-col">
          <Image
            data-testid="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            width={250}
            height={370}
          />
          <div className="flex text-[#9CA3AF] gap-2">
            <p>
              {details.production_countries
                .map((country) => country.iso_3166_1)
                .join(", ")}
              ,
            </p>

            <p data-testid="movie-release-date">{year}</p>
          </div>

          <h2
            data-testid="movie-title"
            className="text-[#111827] font-[700] text-[18px]"
          >
            {movie.title}
          </h2>

          <div className="w-full flex">
            <div className="flex w-full gap-2">
              <Image
                src="/imdblogo.svg"
                alt="imdblogo"
                width={50}
                height={20}
              />

              <p>{details.vote_average}</p>
            </div>

            <div className="flex w-full gap-2 ">
              <Image
                src="/rottentomatoes.svg"
                alt="imdblogo"
                width={20}
                height={20}
              />

              <p>{details.vote_average}</p>
            </div>
          </div>

          <p className="text-[#9CA3AF]">
            {details.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
