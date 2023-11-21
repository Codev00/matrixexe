import tmdbConfig from "@/api/config/tmdb.config";
import favoritesApi from "@/api/modules/favoriteApi";
import { DeleteIcon } from "@/assets/icon/DeleteIcon";
import { deleteFavorite } from "@/hook/user.slice";
import { MovieType } from "@/types/media.type";
import { Image, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FavoriteItem = ({ movie }: { movie: MovieType }) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const handleDelete = async (id: any) => {
      const { res, error } = await favoritesApi.unFavorites({ mediaId: id });
      if (res) {
         dispatch(deleteFavorite(id));
         toast.success("Delete Movie from favorites!!!");
      }
      if (error) console.log(error);
   };
   return (
      <div className="flex w-full md:w-[800px] justify-between py-4 border-b-[1px] border-slate-900 gap-5 md:gap-20">
         <div
            className="w-[100px] md:w-[200px] border-[1px] border-slate-900 cursor-pointer"
            onClick={() => router.push(`/movie/${movie?._id}`)}
         >
            <Image
               src={tmdbConfig.posterPath(movie?.poster_path)}
               radius="none"
               shadow="md"
            />
         </div>
         <div
            className="flex items-center text-lg whitespace-wrap text-center w-[100px] md:w-[500px] cursor-pointer"
            onClick={() => router.push(`/movie/${movie?._id}`)}
         >
            <h1>{movie.name}</h1>
         </div>
         <div className="w-[100px] flex items-center justify-center">
            <Tooltip color="danger" content="Delete">
               <span
                  className="text-xl md:text-2xl text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDelete(movie?._id)}
               >
                  <DeleteIcon />
               </span>
            </Tooltip>
         </div>
      </div>
   );
};

export default FavoriteItem;
