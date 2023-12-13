"use client";
import userApi from "@/api/modules/userApi";
import { Button, Input } from "@nextui-org/react";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { res, error } = await userApi.forgotPassword({ email });
      if (res) {
         toast.success(
            "Send email success. Please check your email. Email: " + email
         );
      }
      if (error) {
         toast.error(error?.message);
      }
   };
   return (
      <div className="flex items-center justify-center mt-10">
         <div className="px-5 md:px-0 w-[400px] md:w-[500px] h-[200px]  ">
            <div className="bg-black/80 w-full h-full rounded-xl px-4 py-2 flex flex-col justify-center gap-5 items-center">
               <div className="w-[70%]">
                  <form
                     onSubmit={handleSubmit}
                     className="w-full flex flex-col items-center gap-5"
                     autoComplete="off"
                  >
                     <Input
                        variant="bordered"
                        color="danger"
                        size="lg"
                        placeholder="Email"
                        width={"90%"}
                        type="email"
                        label="Enter email your account"
                        labelPlacement="outside"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                     />

                     <div className="w-[100px]">
                        <Button color="danger" size="lg" type="submit">
                           Send
                        </Button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ForgotPassword;
