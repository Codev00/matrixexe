"use client";
import genreApi from "@/api/modules/genreApi";
import mediaApi from "@/api/modules/mediaApi";
import userApi from "@/api/modules/userApi";
import Comming from "@/components/Comming";
import HeroSlice from "@/components/HeroSlice";
import TopRate from "@/components/TopRate";
import Trending from "@/components/Trending";
import { setGenres, setListMovie } from "@/hook/global.slice";
import { setUser } from "@/hook/user.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  
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
