"use client";
import mediaApi from "@/api/modules/mediaApi";
import PlayVideo from "@/components/PlayVideo";
import { MovieType } from "@/types/media.type";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PlayMovie = () => {
   const [movie, setMovie] = useState<MovieType>();
   const { mediaId } = useParams();
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.getMedia(mediaId);
         if (res) setMovie(res);
         if (error) toast.error(error?.message);
      })();
   }, [mediaId]);
   return (
      <Suspense>
         {movie && (
            <div className="container mt-[60px] w-full h-auto">
               <div className="my-28">
                  <div className="flex h-14 flex-col w-full bg-slate-800 justify-center rounded-lg py-3 px-2">
                     <p>Kham pha phim o Matrix</p>
                  </div>
                  <PlayVideo videos={movie?.videos} />
               </div>
            </div>
         )}
      </Suspense>
   );
};

export default PlayMovie;
