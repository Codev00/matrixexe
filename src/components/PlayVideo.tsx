import tmdbConfig from "@/api/config/tmdb.config";
import { VideoType } from "@/types/media.type";
import { Chip } from "@nextui-org/react";
import React, { useState } from "react";

const PlayVideo = ({ videos }: { videos: VideoType[] }) => {
   const [select, setSelect] = useState(videos[0].key);
   return (
      <div className="my-10 mx-2 md:mx-0">
         <div className="p-2 bg-black/90 rounded w-full">
            <iframe
               className="w-full h-full aspect-video rounded-2xl"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               src={tmdbConfig.youtubePath(select)}
               allowFullScreen={true}
            ></iframe>
         </div>
         <div className="mt-5">
            <div className="flex gap-5 items-center">
               <h1 className="underline underline-offset-4 font-bold text-danger">
                  Film:
               </h1>
               <div className="flex gap-5">
                  {videos.map((video, index) => (
                     <Chip
                        key={index}
                        variant="shadow"
                        className="cursor-pointer"
                        onClick={() => setSelect(video.key)}
                        color={select == video.key ? "danger" : "default"}
                        size="lg"
                     >
                        Trailer {index + 1}
                     </Chip>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default PlayVideo;
