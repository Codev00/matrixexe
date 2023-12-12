"use client";
import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/mediaApi";
import { AddNoteIcon } from "@/assets/icon/NoteIcon";
import StarIcon from "@/assets/icon/StarIcon";
import { MovieType } from "@/types/media.type";
import { Button, Image, Spinner } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const SearchGenre = () => {
   const searchParams = useSearchParams();
   const search = searchParams.get("search");
   const title = searchParams.get("title");
   const [movies, setMovies] = useState<MovieType[]>([]);
   const [page, setPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const rowPerPage = 10;
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.searchGenre(search);
         if (res) setMovies(res);
         if (error) toast.error(error?.message);
      })();
   }, [search]);
   const items = useMemo(() => {
      const start = 0;
      const add = (page - 1) * rowPerPage;
      const end = add + rowPerPage;
      setIsLoading(false);
      return movies?.slice(start, end);
   }, [page, movies]);
   return (
      <div className="mt-20 container">
         <div className="my-10 text-2xl">
            <h1 className="px-2">
               Search Result:{" "}
               <span className="text-3xl font-semibold italic">{title}</span>
            </h1>
         </div>
         <div>
            <div className="flex flex-wrap gap-3 w-full justify-between md:justify-start px-2">
               {items?.map((item: any, index: number) => (
                  <div
                     className="relative h-full w-[45%] md:w-[19%] border-[1px] border-slate-700 group cursor-pointer"
                     onClick={() => router.push(`/movie/${item?._id}`)}
                     key={index}
                  >
                     <Image
                        src={tmdbConfig.posterPath(item?.poster_path)}
                        radius="none"
                     />
                     <div className="h-[30%] md:h-0  md:group-hover:h-[30%] absolute bottom-0 left-0 z-10  bg-black/70 md:group-hover:bg-black/70 w-full  whitespace-nowrap overflow-hidden text-ellipsis px-2 py-1 text-slate-200 transition-height duration-500 ease-in-out flex flex-col justify-between">
                        <h1 className="block whitespace-nowrap overflow-hidden text-ellipsis text-base font-medium ">
                           {item?.name}
                        </h1>
                        <div className="flex justify-between">
                           <div className="flex items-center gap-1 text-sm">
                              <i className="fi fi-rr-clock-five flex items-center text-danger-500"></i>
                              <span>{item?.runtime} min</span>
                           </div>
                           <span className="flex justify-center items-center gap-1">
                              <StarIcon className="text-danger-500" />
                              {(item?.vote_point / item?.vote_count) | 0}
                              /10
                           </span>
                        </div>
                        <div className="flex justify-between ">
                           <div>
                              <span className="px-1 text-sm text-danger-300 font-medium border-[1px] border-danger-300">
                                 {item?.quality}
                              </span>
                           </div>
                           <span className="text-danger-500 flex justify-center items-center gap-1">
                              <AddNoteIcon />
                              {item?.year}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex w-full justify-center mt-14">
               <Button
                  isDisabled={isLoading}
                  variant="bordered"
                  color="danger"
                  onPress={() => {
                     setPage(page + 1);
                     setIsLoading(true);
                  }}
               >
                  {isLoading && <Spinner color="danger" size="sm" />}
                  Load More
               </Button>
            </div>
         </div>
      </div>
   );
};

export default SearchGenre;
