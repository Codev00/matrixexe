"use client";
import genreApi from "@/api/modules/genreApi";
import mediaApi from "@/api/modules/mediaApi";
import Comming from "@/components/Comming";
import HeroSlice from "@/components/HeroSlice";
import TopRate from "@/components/TopRate";
import Trending from "@/components/Trending";
import { setGenres, setListMovie } from "@/hook/global.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
   const dispatch = useDispatch();
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listMedia();
         if (res) dispatch(setListMovie(res));
         if (error) toast.error(error?.message);
      })();
      (async () => {
         const { res, error } = await genreApi.list();
         if (res) dispatch(setGenres(res));
         if (error) toast.error(error?.message);
      })();
   }, [dispatch]);
   return (
      <main className="flex flex-col pt-[60px] md:pt-[0px] scrollbar-hide">
         <HeroSlice />
         <div className="container">
            <Trending />
            <Comming />
            <TopRate />
         </div>
      </main>
   );
}
