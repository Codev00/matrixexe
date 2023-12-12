import React from "react";
import localFont from "next/font/local";
import Title from "@/components/Title";
import { Image } from "@nextui-org/react";

const myFont = localFont({
   src: "../../../assets/fonts/FirstChristmas-M8av.ttf",
});
const About = () => {
   return (
      <div
         className={`container min-h-screen flex items-center pt-[60px] flex-col`}
      >
         <Title className={`text-5xl `}>... About Us ...</Title>
         <div className="flex flex-col mt-5 items-center w-full text-center justify-between h-full">
            <h3 className="text-xl my-3 font-bold">
               Welcome to Matrix - Your Favorite Movies at Your Fingertips
            </h3>
            <p className="text-lg leading-9 font-medium text-slate-300 mb-5 w-[70%]">
               Matrix is a leading online movie streaming platform that allows
               users to watch movies. Our extensive library has thousands of
               titles across all major genres like action, comedy, drama, horror
               and more. Whether you're looking for the latest blockbuster
               releases or your favorite classic films, we have something for
               everyone.
            </p>
            <p className="text-lg leading-9 font-medium text-slate-300 mb-5 w-[70%]">
               As a Matrix member, you get access to both popular mainstream
               movies as well as niche independent films. Our collection is
               continuously updated so you'll always find fresh and engaging
               content.
            </p>
            <p className="text-lg leading-9 font-medium text-slate-300 mb-5 w-[70%]">
               Watching movies on MovieStream is simple and convenient. No need
               to wait for DVDs to arrive in the mail or drive to the video
               store. With our website or mobile app, you can instantly stream
               high quality videos directly to your device anytime, anywhere.
            </p>
         </div>
      </div>
   );
};

export default About;
