import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/mediaApi";
import { AddNoteIcon } from "@/assets/icon/NoteIcon";
import StarIcon from "@/assets/icon/StarIcon";
import { MovieType, RateType } from "@/types/media.type";
import Algorithm from "@/utils/Algorithm";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "./Title";

const Suggest = () => {
   const [suggest, setSuggest] = useState<MovieType[]>([]);
   const router = useRouter();
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listMedia();
         if (res) setSuggest(res);
         if (error) console.log(error);
      })();
   }, []);
   const suggestList = useMemo(() => {
      return Algorithm.randomMovie(suggest.length, suggest);
   }, [suggest]);
   const handleVote = (rating: RateType[]) => {
      const total: number = rating?.reduce((sum: any, rate: any) => {
         return sum + rate?.rating;
      }, 0);
      if (rating?.length !== 0) {
         if (total === 0) {
            return 0;
         }
         const average = total / rating?.length;
         return Number(average.toFixed(1));
      }
      return 0;
   };
   return (
      <Suspense>
         <div className="my-20 mx-3 md:mx-0">
            <div className="my-5  pb-2">
               <Title className="text-4xl italic text-secondary-500">
                  Suggest
               </Title>
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
                  {suggestList?.map((item, index: number) => (
                     <SwiperSlide key={index}>
                        <div
                           className="relative h-full border-[1px] border-slate-900 group cursor-pointer"
                           onClick={() => router.push(`/movie/${item?._id}`)}
                        >
                           <Image
                              src={tmdbConfig.posterPath(item?.poster_path)}
                              radius="none"
                              width={200}
                              height={300}
                              loading="lazy"
                           />
                           <div className="h-[40%] md:h-0 group-hover:h-[40%] xl:group-hover:h-[30%] absolute bottom-0 left-0 z-10 bg-black/70 md:bg-transparent group-hover:bg-black/70 w-full  whitespace-nowrap overflow-hidden text-ellipsis px-2 py-1 text-slate-200 transition-height duration-500 ease-in-out flex flex-col justify-between ">
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
                                    {handleVote(item?.rating)}
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
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </Suspense>
   );
};

export default Suggest;
