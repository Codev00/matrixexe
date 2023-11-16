"use client";

import FavoriteItem from "@/components/FavoriteItem";
import { Movie } from "@/hook/global.slice";
import { selectUser } from "@/hook/user.slice";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
   const listMovie = useSelector(Movie);
   const User = useSelector(selectUser);
   const favorites = useMemo(() => {
      return User.favorites;
   }, [User]);
   return (
      <div className="pt-[60px] container">
         <div>
            <div className="text-2xl font-medium my-10 flex items-center justify-center ">
               <h1 className="border-b-3 border-danger-400 pb-1">
                  My Favorites
               </h1>
            </div>
            <div className="flex flex-col items-center w-full justify-center mx-2 md:mx-0">
               <div className="flex w-full md:w-[800px] justify-between py-1 border-b-[1px] border-slate-900 gap-5 md:gap-20">
                  <div className="w-[100px] md:w-[200px] text-center">
                     <span className="font-bold text-warning-400">Poster</span>
                  </div>
                  <div className="flex items-center text-lg whitespace-wrap text-center w-[100px] md:w-[500px] ">
                     <span className="font-bold text-warning-400">Name</span>
                  </div>
                  <div className="w-[100px] flex items-center justify-center">
                     <span className="font-bold text-warning-400">Action</span>
                  </div>
               </div>
               {favorites.length === 0 && (
                  <div className="py-10 flex h-[300px] items-center">
                     <h1 className="text-xl italic justify-center text-warning-300 ">
                        No favorites
                     </h1>
                  </div>
               )}
               {favorites.map((movie, index) => (
                  <FavoriteItem movie={movie} key={index} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Favorites;
