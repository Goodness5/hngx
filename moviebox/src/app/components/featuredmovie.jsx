import React from "react";
import ReactLoading from "react-loading";
import MovieCard from "./moviecard";
import Image from "next/image";

const FeaturedMovie = ({ movies, loading, text }) => {
  return (
    <div className="w-full flex-col flex">

      <div className="flex w-full justify-between mb-4">
        <h1 className="font-[700] text-[36px] leading-[48.6px]">
          {text}
        </h1>

        <div className="flex justify-between items-center w-fit">
          <a href="#" className="text-[#BE123C]">
            see more
          </a>
          <Image src="/arrowright.svg" alt="arrow" width={20} height={20} />
        </div>
      </div>

      <div className="md:grid flex flex-col md:grid-cols-4 gap-16 p-8">
        {loading ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={"#BE123C"}
            height={100}
            width={100}
            className="m-auto flex w-full"
          />
        ) : movies ? (
          movies.slice(0, 10).map((movie) => (
            <MovieCard
              key={movie.id}
            movie={movie}
            
            />
          ))
        ) : (
          <div className="font-bold m-auto text-[#BE123C]">
            failed to load movies please try refreshing the page
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedMovie;
