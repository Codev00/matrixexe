import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/mediaApi";
import { MovieType } from "@/types/media.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Genres from "./Genres";

const HeroSlice = () => {
   const [medias, setMedias] = useState<MovieType[]>([]);
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listMedia();
         if (res) {
            setMedias(res);
         }
         if (error) console.log(error);
      })();
   }, []);
   return (
      <div className="h-screen w-screen relative hidden lg:block ">
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
            className="relative w-full h-full mySwiper overflow-x-hidden"
         >
            {medias.slice(0, 7)?.map((item, index) => (
               <SwiperSlide key={index}>
                  <div
                     className={`ralative bg-[url(${tmdbConfig.backdropPath(
                        item?.backdrop_path
                     )})] transition-all duration-300 ease-out`}
                  >
                     <Image
                        src={tmdbConfig.backdropPath(item?.backdrop_path)}
                        fill
                        sizes=" 100vw"
                        alt=""
                        quality={75}
                        className="object-cover z-0 opacity-40 shadow-xl shadow-black"
                     />
                     <div
                        className="w-full h-40 absolute bottom-0 left-0"
                        style={{
                           background:
                              "linear-gradient(180deg,rgba(255,213,453,0) 0%, #000 79.17%)",
                        }}
                     ></div>
                     <div className="w-full h-screen flex items-center justify-center">
                        <div
                           className={`relative flex ${
                              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                           } w-[75%] gap-10 `}
                        >
                           <div className="w-full h-[500px] flex flex-col justify-center p-7">
                              <h2 className="text-6xl font-bold mb-5 text-white drop-shadow-xl">
                                 {item?.name}
                              </h2>
                              <Genres genres={item.genres} size="lg" />
                              <div className="text-white text-justify">
                                 {item?.overview}
                              </div>
                              <div className="mt-10">
                                 <Link
                                    href={`/movie/${item?._id}`}
                                    className="relative inline-block text-lg group"
                                 >
                                    <span className="relative z-10 block px-5 py-3 font-bold overflow-hidden  leading-tight text-danger transition-colors duration-300 ease-out border-2 border-danger rounded-3xl group-hover:text-white">
                                       <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-3xl bg-gray-50"></span>
                                       <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-danger group-hover:-rotate-180 ease"></span>
                                       <span className="relative">
                                          Watch Now
                                       </span>
                                    </span>
                                    <span
                                       className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-danger rounded-3xl group-hover:mb-0 group-hover:mr-0 group-hover:shadow-lg group-hover:transition-shadow group-hover:shadow-danger-600"
                                       data-rounded="rounded-lg"
                                    ></span>
                                 </Link>
                              </div>
                           </div>

                           <Image
                              src={tmdbConfig.posterPath(item?.poster_path)}
                              width={330}
                              height={230}
                              alt=""
                              className="z-10 relative top-5 left-5 shadow-xl shadow-black"
                           />
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default HeroSlice;
