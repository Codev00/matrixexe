"use client";
import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/mediaApi";
import { PlayIcon } from "../../../../assets/icon/PlayIcon";
import { toTime } from "@/utils/Math";
import { ScrollShadow } from "@nextui-org/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Genres from "@/components/Genres";
import { MovieType } from "@/types/media.type";

const DetailMedia = () => {
   const [media, setMedia] = useState<any>({});
   const { mediaId } = useParams();
   const router = useRouter();
   const [favorite, setFavorite] = useState(false);
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.getMedia(mediaId);
         console.log(res);

         if (res) setMedia(res);
         if (error) toast.error(error?.message);
      })();
   }, [mediaId]);
   return (
      <div className="w-auto h-auto min-h-screen relative back z-0">
         <Image
            src={tmdbConfig.backdropPath(media?.backdrop_path)}
            fill={true}
            sizes="(max-width: 768px) 100vw, 100vw"
            alt={media?.name}
            quality={80}
            style={{
               objectFit: "cover",
               zIndex: -1,
               opacity: 0.2,
            }}
            className="back"
         />

         <div className="z-1  w-full h-full md:h-screen container flex  justify-center items-center gap-6 flex-col md:flex-row">
            <div className="w-full min-h-[450px]  flex justify-center items-center gap-6 flex-col md:flex-row">
               <Image
                  src={tmdbConfig.posterPath(media?.poster_path)}
                  alt={media?.name}
                  width={300}
                  height={400}
                  className="rounded-md mt-20 md:mt-0 object-cover"
               />
               <div className="px-2 h-full w-full text-white flex flex-col gap-2 justify-between">
                  <div className="md:mb-3">
                     <h1 className="text-4xl  font-medium">
                        {media?.name}{" "}
                        {media?.title &&
                           dayjs(media?.release_date).format("YYYY")}
                     </h1>
                  </div>
                  <Genres genres={media?.genres} />
                  <div className="flex items-center h-16 gap-5 justify-start">
                     <div
                        className="playbtn relative min-w-16 gap-2 flex flex-row items-center hover:text-[#da2f68] cursor-pointer"
                        onClick={() => router.push(`/movie/${mediaId}/play`)}
                     >
                        <PlayIcon />
                        <span className="text-lg font-light transition-all duration-300 ease-in-out">
                           Watch Trailer
                        </span>
                     </div>
                     <div>DDnahs gias</div>
                  </div>
                  <span className="text-2xl font-medium">Overview</span>
                  <ScrollShadow
                     hideScrollBar
                     className="w-full min-h-[100px] max-h-[150px] md:h-[100px] mb-3 md:mb-0 text-base text-justify font-normal"
                  >
                     {media?.overview}
                  </ScrollShadow>
                  <div className="flex justify-between text-lg pb-2 ">
                     <div className="flex flex-col  lg:flex-row lg:gap-2">
                        <span className="font-medium">Status: </span>
                        <span className="text-slate-500 gap-2 text-lg text-center font-medium">
                           {" "}
                           {media?.status}
                        </span>
                     </div>
                     <div className="flex flex-col lg:flex-row lg:gap-2">
                        <span className="font-medium">Release Date: </span>
                        <span className="text-slate-500 gap-2 text-lg text-center font-medium">
                           {dayjs(media?.release_date).format("MMM DD, YYYY")}
                        </span>
                     </div>
                     <div className="flex flex-col lg:flex-row lg:gap-2">
                        <span className="font-medium">Runtime: </span>
                        <span className="text-slate-500 gap-2 text-lg text-center font-medium">
                           {toTime(media?.runtime)}
                        </span>
                     </div>
                  </div>
                  {/* <div className="text-lg border-b border-solid border-slate-500 flex gap-2 pb-2 ">
                     <span className="font-medium ">Director: </span>
                     {media.credits.crew
                        .filter((f) => f.job === "Director")
                        .map((item, index) => (
                           <span
                              key={index}
                              className="text-slate-500 font-medium"
                           >
                              {item.name}
                              {","}
                           </span>
                        ))}
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default DetailMedia;
