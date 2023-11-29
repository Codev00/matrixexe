"use client";
import userApi from "@/api/modules/userApi";
import StarIcon from "@/assets/icon/StarIcon";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const Premium = () => {
   const router = useRouter();
   const idRan = Math.floor(Math.random() * 999999999);
   const handleSubmit = async () => {
      const { res, error } = await userApi.premium(idRan);
      if (res) {
         console.log(res.paymentUrl);

         router.push(res.paymentUrl);
      }
      if (error) console.log(error);
   };
   return (
      <div className="h-screen">
         <div className="container pt-[60px] h-full">
            <div className="h-full pt-10">
               <div className="flex flex-row  w-full h-auto justify-center mx-2 md:mx-0">
                  <div className="flex w-[70%] justify-center  gap-10">
                     <div className="w-[50%] min-h-[500px] border-2 border-slate-700 flex flex-col justify-between">
                        <h1 className="h-[60px] flex items-center justify-center font-extrabold text-4xl italic">
                           Started
                        </h1>
                        <ul className="min-h-[250px] flex flex-col gap-5 px-4 text-slate-300">
                           <li className="flex items-center gap-5 text-lg">
                              <StarIcon className="text-danger-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                           <li className="flex items-center gap-5 text-lg">
                              <StarIcon className="text-danger-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                           <li className="flex items-center gap-5 text-lg text-default-400">
                              <StarIcon className="text-default-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                        </ul>
                        <div className="h-[100px] flex items-center justify-center">
                           <Button
                              color="default"
                              variant="flat"
                              radius="lg"
                              size="lg"
                              className="text-2xl font-bold italic text-slate-400"
                              disabled
                           >
                              Free
                           </Button>
                        </div>
                     </div>
                     <div className="w-[50%] min-h-[500px] border-2 border-danger-400 flex flex-col justify-between">
                        <h1 className="h-[60px] flex text-transparent items-center justify-center font-extrabold text-4xl italic bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                           Premium
                        </h1>
                        <ul className="min-h-[250px] flex flex-col gap-5 px-4 text-slate-300">
                           <li className="flex items-center gap-5 text-lg">
                              <StarIcon className="text-danger-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                           <li className="flex items-center gap-5 text-lg">
                              <StarIcon className="text-danger-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                           <li className="flex items-center gap-5 text-lg text-default-400">
                              <StarIcon className="text-default-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                        </ul>
                        <div className="h-[100px] flex items-center justify-center">
                           <Button
                              color="danger"
                              variant="ghost"
                              radius="lg"
                              size="lg"
                              className="text-2xl font-bold italic"
                              onClick={handleSubmit}
                           >
                              $299.00
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Premium;
