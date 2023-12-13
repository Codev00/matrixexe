"use client";
import userApi from "@/api/modules/userApi";
import { EyeFilledIcon } from "@/assets/icon/EyeIcon";
import { EyeSlashFilledIcon } from "@/assets/icon/EyeSlashIcon";
import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
   const searchParams = useSearchParams();
   const router = useRouter();
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const email = searchParams.get("email");
   const token = searchParams.get("token");

   const [isVisible, setIsVisible] = React.useState(false);
   const toggleVisibility = () => setIsVisible(!isVisible);
   const handleSubmit = async () => {
      if (password !== confirmPassword) {
         toast.error("Password not match");
         return;
      }
      console.log({
         email,
         token,
         password,
      });

      const { res, error } = await userApi.resetPassword({
         email,
         token,
         password,
      });
      if (res) {
         toast.success("Reset password success");
         setTimeout(() => {
            router.push("/sign-in");
         }, 3000);
      }
      if (error) {
         toast.error(error?.message);
      }
   };
   return (
      <div className="flex items-center justify-center mt-10">
         <div className="px-5 md:px-0 w-[400px] md:w-[500px] h-[300px]  ">
            <div className="bg-black/80 w-full h-full rounded-xl px-4 py-2 flex flex-col justify-center gap-5 items-center">
               <div className="w-[75%] flex flex-col gap-3">
                  <Input
                     variant="bordered"
                     color="danger"
                     size="lg"
                     placeholder="Enter new password"
                     width={"90%"}
                     label="New password"
                     value={password}
                     labelPlacement="outside"
                     onChange={(e) => setPassword(e.target.value)}
                     endContent={
                        <button
                           className="focus:outline-none"
                           type="button"
                           onClick={toggleVisibility}
                        >
                           {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl pointer-events-none text-secondary-500" />
                           ) : (
                              <EyeFilledIcon className="text-2xl text-secondary-500 pointer-events-none" />
                           )}
                        </button>
                     }
                     type={isVisible ? "text" : "password"}
                  />
                  <Input
                     variant="bordered"
                     color="danger"
                     size="lg"
                     placeholder="Enter confirm password"
                     width={"90%"}
                     value={confirmPassword}
                     label="Confirm password"
                     labelPlacement="outside"
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     endContent={
                        <button
                           className="focus:outline-none"
                           type="button"
                           onClick={toggleVisibility}
                        >
                           {isVisible ? (
                              <EyeSlashFilledIcon className="text-2xl pointer-events-none text-secondary-500" />
                           ) : (
                              <EyeFilledIcon className="text-2xl text-secondary-500 pointer-events-none" />
                           )}
                        </button>
                     }
                     type={isVisible ? "text" : "password"}
                  />
               </div>
               <div className="w-[100px]">
                  <Button
                     color="danger"
                     size="lg"
                     onClick={() => handleSubmit()}
                  >
                     Send
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;
