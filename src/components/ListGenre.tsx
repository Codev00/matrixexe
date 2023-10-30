import { listGenres } from "@/hook/global.slice";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ListGenre = () => {
   const genres = useSelector(listGenres);
   const router = useRouter();
   return (
      <div className="flex w-96 flex-wrap ">
         {genres?.map((item, index) => (
            <div
               key={index}
               className="flex items-center justify-center px-3  py-2 w-[33%] cursor-pointer box-border  hover:text-danger hover:font-bold transition-all duration-300 ease-linear"
               onClick={() =>
                  router.push(
                     `/movie/search/genre?search=${item._id}&title=${item.title}`
                  )
               }
            >
               <span>{item.title}</span>
            </div>
         ))}
      </div>
   );
};

export default ListGenre;
