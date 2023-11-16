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
               {listMovie.map((movie, index) => (
                  <FavoriteItem movie={movie} key={index} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Favorites;
