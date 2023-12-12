"use client";
import Comming from "@/components/Comming";
import HeroSlice from "@/components/HeroSlice";
import TopRate from "@/components/TopRate";
import Trending from "@/components/Trending";

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
