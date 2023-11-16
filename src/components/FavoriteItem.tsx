import tmdbConfig from "@/api/config/tmdb.config";
import { DeleteIcon } from "@/assets/icon/DeleteIcon";
import { MovieType } from "@/types/media.type";
import { Image, Tooltip } from "@nextui-org/react";
import React from "react";

const FavoriteItem = ({ movie }: { movie: MovieType }) => {
   return (
      <div className="flex w-full md:w-[800px] justify-between py-4 border-b-[1px] border-slate-900 gap-5 md:gap-20">
         <div className="w-[100px] md:w-[200px] border-[1px] border-slate-900">
            <Image
               src={tmdbConfig.posterPath(movie?.poster_path)}
               radius="none"
               shadow="md"
            />
         </div>
         <div className="flex items-center text-lg whitespace-wrap text-center w-[100px] md:w-[500px]">
            <h1>{movie.name}</h1>
         </div>
         <div className="w-[100px] flex items-center justify-center">
            <Tooltip color="danger" content="Delete">
               <span className="text-xl md:text-2xl text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
               </span>
            </Tooltip>
         </div>
      </div>
   );
};

export default FavoriteItem;
