"use client";
import userApi from "@/api/modules/userApi";
import StarIcon from "@/assets/icon/StarIcon";
import { Premium } from "@/hook/global.slice";
import { Button, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const PremiumPage = () => {
   const router = useRouter();
   const idRan = Math.floor(Math.random() * 999999999999);
   const isPremium = useSelector(Premium);
   const handleSubmit = async () => {
      const { res, error } = await userApi.premium(idRan);
      if (res) {
         router.push(res.paymentUrl);
      }
      if (error) console.log(error);
   };
   return (
      <div className="min-h-screen">
         <div className="container pt-[60px] h-full">
            <div className="h-full pt-10">
               <div className="flex flex-row w-full h-auto justify-center mx-2 md:mx-0">
                  <div className="flex flex-col md:flex-row w-[80%] md:w-[70%] justify-center  gap-10">
                     <div className="w-full md:w-[50%] min-h-[550px] border-2 border-slate-700 flex flex-col justify-between">
                        <h1 className="h-[60px] mt-2 flex items-center justify-center font-extrabold text-4xl italic">
                           Started
                        </h1>
                        <ul className="min-h-[250px] flex flex-col gap-5 px-4 text-slate-300">
                           <li className="flex items-center gap-5 text-lg">
                              <StarIcon className="text-secondary-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                           <li className="flex items-center gap-5 text-lg">
                              <StarIcon className="text-secondary-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                           <li className="flex items-center gap-5 text-lg text-default-400">
                              <StarIcon className="text-default-400 text-4xl" />
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                           </li>
                        </ul>
                        <div className="h-[120px] flex  gap-3 flex-col items-center justify-center">
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
                           {!isPremium && (
                              <Chip
                                 variant="bordered"
                                 color="default"
                                 className="text-slate-500"
                                 radius="none"
                              >
                                 Activated
                              </Chip>
                           )}
                        </div>
                     </div>

                     <div className="w-full md:w-[50%] min-h-[550px] p-[2px] bg-gradient-to-br from-purple-400 via-violet-500 to-pink-600">
                        <div className="w-full h-full flex flex-col justify-between bg-black">
                           <h1 className="h-[60px] mt-2 flex text-transparent items-center justify-center font-extrabold text-4xl italic bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-pink-600">
                              Premium
                           </h1>
                           <ul className="min-h-[250px] flex flex-col gap-5 px-4 text-slate-300">
                              <li className="flex items-center gap-5 text-lg">
                                 <StarIcon className="text-secondary-400 text-4xl" />
                                 Lorem ipsum dolor sit amet consectetur
                                 adipisicing elit.
                              </li>
                              <li className="flex items-center gap-5 text-lg">
                                 <StarIcon className="text-secondary-400 text-4xl" />
                                 Lorem ipsum dolor sit amet consectetur
                                 adipisicing elit.
                              </li>
                              <li className="flex items-center gap-5 text-lg ">
                                 <StarIcon className="text-secondary-400 text-4xl" />
                                 Lorem ipsum dolor sit amet consectetur
                                 adipisicing elit.
                              </li>
                           </ul>
                           <div className="h-[120px] flex flex-col gap-3 items-center justify-center">
                              <Button
                                 color="secondary"
                                 variant="ghost"
                                 radius="lg"
                                 size="lg"
                                 className="text-2xl font-bold italic"
                                 onClick={handleSubmit}
                                 isDisabled={isPremium}
                              >
                                 $299.00
                              </Button>

                              {isPremium && (
                                 <Chip
                                    variant="bordered"
                                    color="secondary"
                                    radius="none"
                                 >
                                    Activated
                                 </Chip>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PremiumPage;
