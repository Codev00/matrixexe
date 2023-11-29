"use client";
import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/mediaApi";
import { PlayIcon } from "../../../../assets/icon/PlayIcon";
import { toTime } from "@/utils/Algorithm";
import { ScrollShadow, Skeleton } from "@nextui-org/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import Genres from "@/components/Genres";
import ReactStars from "react-stars";
import rateApi from "@/api/modules/rateApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/hook/user.slice";
import Comments from "@/components/Comments";
import Suggest from "@/components/Suggest";
import FavoriteIcon from "@/assets/icon/FavoriteIcon";
import UnfavoriteIcon from "@/assets/icon/UnfavoriteIcon";
import userApi from "@/api/modules/userApi";

const DetailMedia = () => {
   const [media, setMedia] = useState<any>({});
   const user = useSelector(selectUser);
   const { mediaId }: { mediaId: any } = useParams();
   const router = useRouter();
   const [favorite, setFavorite] = useState(false);
   const [rating, setRating] = useState<any>(0);
   const [cmt, actionCmt] = useState(false);
   const [loadings, setLoading] = useState(true);
   const dispatch = useDispatch();
   useEffect(() => {
      const checkFavorites = user.favorites.find((item) => {
         console.log(item._id, mediaId);

         return item._id == mediaId;
      });
      console.log(checkFavorites);

      if (checkFavorites) {
         setFavorite(true);
      }
   }, [dispatch]);
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.getMedia(mediaId);
         if (res) setMedia(res);
         if (error) toast.error(error?.message);
      })();
   }, [mediaId, rating, cmt, favorite]);
   useEffect(() => {
      (async () => {
         const { res, error } = await userApi.getInfo();
         if (res) dispatch(setUser(res));
         if (error) toast.error(error?.message);
      })();
   }, [favorite, mediaId]);
   useEffect(() => {
      setTimeout(() => {
         setLoading(false);
      }, 3000);
   }, []);

   const handleRating = async (value: any) => {
      const { res, error } = await rateApi.create({
         mediaId,
         userId: user._id,
         rating: value,
      });
      if (res) {
         toast.success(`Rating successfully!!!`);
         setRating(value);
      }
      if (error) toast.error(error?.message);
   };

   const handleVote = () => {
      const total = media.rating?.reduce((sum: any, rating: any) => {
         return sum + rating?.rating;
      }, 0);
      if (media.rating?.length !== 0) {
         if (total === 0) {
            return 0;
         }
         const average = total / media.rating?.length;
         return Number(average.toFixed(1));
      }
      return 0;
   };
   return (
      <Suspense>
         <div>
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
                        height={450}
                        className="shadow-lg mt-20 md:mt-0"
                     />

                     <div className="px-2 h-full w-full text-white flex flex-col gap-2 justify-between">
                        <div className="md:mb-3 flex gap-2">
                           {favorite == true ? (
                              <FavoriteIcon
                                 mediaId={mediaId}
                                 favorite={() => {
                                    setFavorite(false);
                                 }}
                              />
                           ) : (
                              <UnfavoriteIcon
                                 mediaId={mediaId}
                                 favorite={() => {
                                    setFavorite(true);
                                 }}
                              />
                           )}
                           <h1 className="text-4xl  font-medium">
                              {media?.name}{" "}
                              {media?.title &&
                                 dayjs(media?.release_date).format("YYYY")}
                           </h1>
                        </div>
                        <Genres genres={media?.genres} />
                        <div className="flex flex-col md:flex-row items-start md:items-center h-auto md:h-16 gap-5 md:gap-10 justify-start">
                           <div
                              className="playbtn relative min-w-16 gap-2 flex flex-row items-center hover:text-[#da2f68] cursor-pointer"
                              onClick={() =>
                                 router.push(`/movie/${mediaId}/play`)
                              }
                           >
                              <PlayIcon />
                              <span className="text-xl font-light transition-all duration-300 italic ease-in-out">
                                 Watch Now
                              </span>
                           </div>
                           <div className="flex flex-col items-center">
                              <ReactStars
                                 count={10}
                                 value={handleVote()}
                                 size={36}
                                 edit={true}
                                 char="⚝"
                                 color2={"#F31260"}
                                 onChange={(value: any) => handleRating(value)}
                              />

                              <div>
                                 <span>
                                    (Rated{" "}
                                    <span className="font-semibold text-danger-500">
                                       {handleVote()} /10
                                    </span>{" "}
                                    from{" "}
                                    <span className="font-semibold text-danger-500">
                                       {media?.rating?.length}
                                    </span>{" "}
                                    members)
                                 </span>
                              </div>
                           </div>
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
                              <span className="text-danger-500 gap-2 text-lg text-center font-medium">
                                 {" "}
                                 {media?.status}
                              </span>
                           </div>
                           <div className="flex flex-col lg:flex-row lg:gap-2">
                              <span className="font-medium">
                                 Release Date:{" "}
                              </span>
                              <span className="text-danger-500 gap-2 text-lg text-center font-medium">
                                 {dayjs(media?.release_date).format(
                                    "MMM DD, YYYY"
                                 )}
                              </span>
                           </div>
                           <div className="flex flex-col lg:flex-row lg:gap-2">
                              <span className="font-medium">Runtime: </span>
                              <span className="text-danger-500 gap-2 text-lg text-center font-medium">
                                 {toTime(media?.runtime)}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="relative">
               <Comments
                  user={user}
                  mediaId={media?._id}
                  reviews={media?.reviews}
                  callBack={() => {
                     actionCmt(!cmt);
                  }}
               />
               <div className="container">
                  <Suggest />
               </div>
            </div>
         </div>
      </Suspense>
   );
};

export default DetailMedia;
