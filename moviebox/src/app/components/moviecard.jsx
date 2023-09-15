"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import CustomLoading from "./loading";
import Link from "next/link";

const MovieCard = ({ movie, loading }) => {
  const [details, setDetails] = useState(null);

  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const [imdbRating, setImdbRating] = useState(null);
  const [rottenTomatoesRating, setRottenTomatoesRating] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        const data = await response.json();
        setDetails(data);

        // Fetch additional details from OMDB API
        const omdbResponse = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${process.env.OMDB_API_KEY}`
        );
        const omdbData = await omdbResponse.json();

        if (omdbData.imdbRating) {
          setImdbRating(parseFloat(omdbData.imdbRating) * 10);
        }

        if (omdbData.Ratings && omdbData.Ratings.length > 1 && omdbData.Ratings[1].Value) {
          setRottenTomatoesRating(omdbData.Ratings[1].Value);
        }
      } catch (error) {
        console.error(`Error fetching details for ${movie.title}:`, error);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  const year = new Date(movie.release_date).getFullYear();

  return (
    <div className=" w-full relative" data-testid="movie-card">
       <a href={`/movies/${encodeURIComponent(movie.id)}`}>
      {loading ? (
        <CustomLoading />
      ) : (
        details && (
          <div data-testid="movie-card" className="gap-2 flex flex-col">
            {imageError ? (
              <Image
                src="/noimage.svg"
                alt={`${movie.title}`}
                width={80}
                height={100}
                className="m-auto flex w-full"
              />
            ) : (
              <Image
                data-testid="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title}`}
                width={80}
                height={100}
                className="m-auto flex w-full"
                onError={handleImageError}
              />
            )}

{isFavorite ? (
      <Image
        src="/favoritemarked.svg"
        alt={`${movie.title}`}
        width={40}
        height={40}
        className="absolute right-3 top-3 cursor-pointer"
        onClick={handleToggleFavorite}
      />
    ) : (
      <Image
        src="/favorite.svg"
        alt={`${movie.title}`}
        width={40}
        height={40}
        className="absolute right-3 top-3 cursor-pointer"
        onClick={handleToggleFavorite}
      />
    )}
            <div className="flex text-[#9CA3AF] gap-2">
              <p>
                {details.production_countries &&
                details.production_countries.length > 0
                  ? details.production_countries
                      .map((country) => country.iso_3166_1)
                      .join(", ")
                  : "N/A"}
              </p>

              <p data-testid="movie-release-date">{year}</p> 
            </div>

            <h2
              data-testid="movie-title"
              className="text-[#111827] font-[700] text-[18px]"
            >
              {movie.title}
            </h2>

            <div className="w-full flex justify-between md:gap-16">
              <div className="flex w-full gap-2">
                <Image
                  src="/imdblogo.svg"
                  alt="imdblogo"
                  width={50}
                  height={20}
                />

                <p>{imdbRating + '/100' || "N/A"}</p>
              </div>

              <div className="flex w-full gap-2 justify-end">
                <Image
                  src="/rottentomatoes.svg"
                  alt="imdblogo"
                  width={20}
                  height={20}
                />

                <p>{rottenTomatoesRating || "N/A"}</p>
              </div>
            </div>

            <p className="text-[#9CA3AF]">
              {details.genres.map((genre) => genre.name).join(", ")}
            </p>
              <p data-testid="movie-release-date">{movie.release_date}</p>
          </div>
        )
      )}
      </a>
    </div>
  );
};

export default MovieCard;
