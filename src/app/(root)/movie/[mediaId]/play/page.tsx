"use client";
import mediaApi from "@/api/modules/mediaApi";
import Comments from "@/components/Comments";
import PlayVideo from "@/components/PlayVideo";
import Suggest from "@/components/Suggest";
import { selectUser } from "@/hook/user.slice";
import { MovieType } from "@/types/media.type";
import { useParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PlayMovie = () => {
   const [movie, setMovie] = useState<MovieType>();
   const [loading, setLoading] = useState(false);
   const router = useRouter();
   const user = useSelector(selectUser);
   const { mediaId }: { mediaId: string } = useParams();
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.getMedia(mediaId);
         if (res) setMovie(res);
         if (error) toast.error(error?.message);
      })();
   }, [mediaId, loading]);
   return (
      <Suspense>
         <div className="container mt-[60px] w-full h-auto">
            <div className="my-28">
               <div className="flex h-16 flex-col w-full bg-slate-950 text-danger-300 font-base justify-center rounded-lg py-3 px-2 text-xl">
                  <p>
                     -- Explore the world of cinema =={"> "}
                     <span
                        className="cursor-pointer text-warning-400 border-b-2 border-warning-400 italic font-medium"
                        onClick={() => router.push("/")}
                     >
                        here!
                     </span>
                  </p>
               </div>
               {movie ? (
                  <PlayVideo videos={movie?.videos} />
               ) : (
                  <div className="my-10 mx-2 md:mx-0">
                     <div className="p-2 bg-black/90 rounded w-full">
                        <iframe
                           className="w-full h-full aspect-video"
                           allowTransparency
                        ></iframe>
                     </div>
                  </div>
               )}
            </div>
         </div>

         <Comments
            callBack={() => {
               setLoading(!loading);
            }}
            mediaId={mediaId}
            user={user}
            reviews={movie?.reviews}
         />
         <div className="container">
            <Suggest />
         </div>
      </Suspense>
   );
};

export default PlayMovie;
