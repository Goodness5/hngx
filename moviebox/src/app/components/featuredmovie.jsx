import React from "react";
import ReactLoading from "react-loading";
import MovieCard from "./moviecard";
import Image from "next/image";
import CustomLoading from "./loading";

const FeaturedMovie = ({ movies, loading, text }) => {
  return (
    <div className="w-full flex-col flex">
      <div className="">
{loading? <div className="absolute bg-cover h-full bg-opacity-70 bg-black w-full top-0 bottom-0">

<CustomLoading /> 
</div> 
: <div className="">
    

      <div className="md:grid w-full items-center flex flex-col md:grid-cols-4 gap-16 p-8">
       {
         movies ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
            movie={movie}
            loading={loading}
            
            />
          ))
        ) : (
          <div className="font-bold m-auto text-[#BE123C]">
            failed to load movies please try refreshing the page
          </div>
        )}
      </div></div>
}
</div>
    </div>
  );
};

export default FeaturedMovie;
