import mediaApi from "@/api/modules/mediaApi";
import React, { useLayoutEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Image } from "@nextui-org/react";
import tmdbConfig from "@/api/config/tmdb.config";
import { useRouter } from "next/navigation";
import { MovieType } from "@/types/media.type";

const Trending = () => {
   const [medias, setMedias] = useState<MovieType[]>([]);
   const router = useRouter();
   useLayoutEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listMedia();
         if (res) {
            setMedias(res);
         }
         if (error) console.log(error);
      })();
   }, []);
   return (
      <div className="mt-10">
         <div className="my-16 flex items-center justify-center">
            <h1 className="text-4xl font-semibold">Trending</h1>
         </div>
         <div>
            <Swiper
               modules={[Autoplay]}
               grabCursor={true}
               spaceBetween={0}
               slidesPerView={1}
               autoplay={{
                  pauseOnMouseEnter: false,
                  delay: 5000,
                  stopOnLastSlide: false,
                  disableOnInteraction: false,
               }}
               loop={true}
               breakpoints={{
                  320: {
                     slidesPerView: 2,
                     spaceBetween: 5,
                  },
                  1024: {
                     slidesPerView: 5,
                     spaceBetween: 10,
                  },
               }}
               className="relative w-full h-full mySwiper overflow-x-hidden"
            >
               {medias
                  .sort((v1: any, v2: any) => {
                     return v2?.views - v1?.views;
                  })
                  .slice(0, 12)
                  .map((item: any, index: number) => (
                     <SwiperSlide key={index}>
                        <div
                           className="relative h-full border-[1px] border-slate-700 group cursor-pointer"
                           onClick={() => router.push(`/movie/${item?._id}`)}
                        >
                           <Image
                              src={tmdbConfig.posterPath(item?.poster_path)}
                              radius="none"
                           />
                           <div className="block h-0 group-hover:h-[30%] absolute bottom-0 left-0 z-10 bg-black/70 w-full  whitespace-nowrap overflow-hidden text-ellipsis group-hover:px-2 group-hover:py-1 text-slate-200 transition-all duration-500 ease-in-out">
                              <h1 className="block whitespace-nowrap overflow-hidden text-ellipsis text-base font-bold ">
                                 {item?.name}
                              </h1>
                              <div className="flex justify-between">
                                 <div className="flex items-center gap-1 text-sm">
                                    <i className="fi fi-rr-clock-five flex items-center text-danger-500"></i>
                                    <span>{item?.runtime} min</span>
                                 </div>
                                 <span>
                                    {item?.vote_point / item?.vote_count}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
            </Swiper>
         </div>
      </div>
   );
};

export default Trending;
