"use client";
import mediaApi from "@/api/modules/mediaApi";
import Comments from "@/components/Comments";
import PlayVideo from "@/components/PlayVideo";
import Suggest from "@/components/Suggest";
import { selectUser } from "@/hook/user.slice";
import { MovieType } from "@/types/media.type";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PlayMovie = () => {
   const [movie, setMovie] = useState<MovieType>();
   const user = useSelector(selectUser);
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
                  <div className="flex h-14 flex-col w-full bg-slate-900 justify-center rounded-lg py-3 px-2">
                     <p>Kham pha phim o Matrix</p>
                  </div>
                  <PlayVideo videos={movie?.videos} />
               </div>
            </div>
         )}
         <Comments user={user} reviews={movie?.reviews} />
         <div className="container">
            <Suggest />
         </div>
      </Suspense>
   );
};

export default PlayMovie;
