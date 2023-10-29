"use client";

import userApi from "@/api/modules/userApi";
import { setUser } from "@/hook/user.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const { res, error } = await userApi.signin({ username, password });
      setIsLoading(false);
      if (res) {
         dispatch(setUser(res));
         setUsername("");
         setPassword("");
         toast.success("Sign in success");
         setTimeout(() => {
            router.push("/");
         }, 3000);
      }
      if (error) {
         toast.error(error?.message);
      }
   };

   return (
      <Suspense fallback={null}>
         <div className="w-full h-full flex flex-col items-center justify-center ">
            <div className="h-[100px] w-full"></div>
            <div className="h-full w-[450px]  bg-black/70 px-[68px] pt-[60px] pb-[40px]">
               <div className="h-[370px]">
                  <h1 className=" text-white text-[32px] font-bold mb-[28px]">
                     Sign in
                  </h1>
                  <form onSubmit={handleSubmit}>
                     <div className="h-[66px] pb-4">
                        <div className="relative z-0 w-full group h-[50px] bg-slate-800/70 rounded">
                           <input
                              value={username}
                              type="text"
                              onChange={(e) => setUsername(e.target.value)}
                              autoComplete="off"
                              id="floating_name"
                              className="block   w-full h-[50px] text-md text-gray-900 bg-transparent   appearance-none dark:text-white focus:border-b-2
                     focus:border-danger-400 
                     dark:focus:border-b-2
                     focus:outline-none focus:ring-0 dark:focus:border-danger-400 dark:focus:rounded px-[20px] pt-4 peer"
                              placeholder="username"
                              required
                              min={6}
                              minLength={6}
                           />
                        </div>
                     </div>
                     <div className="h-[66px] pb-4">
                        <div className="relative z-0 w-full mb-6 group h-[50px] bg-slate-800/70 rounded">
                           <input
                              value={password}
                              type="password"
                              autoComplete="off"
                              onChange={(e) => setPassword(e.target.value)}
                              id="password"
                              className="block   w-full h-full text-md text-gray-900 bg-transparent   appearance-none dark:text-white dark:border-gray-600 
                     focus:border-b-2
                     focus:border-danger-400 
                     dark:focus:border-b-2
                     focus:outline-none focus:ring-0 dark:focus:border-danger-400 dark:focus:rounded px-[20px] pt-4 peer"
                              placeholder="password"
                              required
                              min={6}
                              minLength={6}
                           />
                        </div>
                     </div>
                     <button
                        type="submit"
                        className="text-white font-bold bg-red-600 w-full h-[48px] rounded mt-6 mb-3 p-3 text-[16px]"
                     >
                        Sign in
                     </button>
                     <div className="flex flex-row items-center justify-between">
                        <span className="text-[#737373] text-[14px]"></span>
                        <Link href={"#"} className="text-[#737373] text-[14px]">
                           Bạn cần trợ giúp?
                        </Link>
                     </div>
                  </form>
               </div>
               <div>
                  <div>
                     <span className="text-[#737373]">
                        Bạn mới tham gia Matrix?{" "}
                     </span>
                     <Link
                        href="/sign-up"
                        className="text-white hover:text-danger-500"
                     >
                        Đăng ký ngay
                     </Link>
                  </div>
                  <div className="mt-3">
                     <p className="text-[#737373] text-[14px]">
                        Thông tin do Google reCAPTCHA thu thập sẽ tuân theo{" "}
                        <Link
                           href={"https://policies.google.com/privacy"}
                           className="text-blue-600"
                        >
                           Chính sách Quyền riêng tư
                        </Link>{" "}
                        and{" "}
                        <Link
                           href={"https://policies.google.com/terms"}
                           className="text-blue-600"
                        >
                           Điều khoản dịch vụ
                        </Link>{" "}
                        của Google, và được dùng để cung cấp, duy trì và cải
                        thiện dịch vụ reCAPTCHA cũng như các mục đích bảo mật
                        nói chung
                     </p>
                  </div>
               </div>
               {/* <div className=" flex flex-col justify-center items-end gap-4 py-4 pr-2 absolute w-full top-0 right-0 ">
                  <Alert type="Error" text="Đăng nhập không thành công" />
               </div> */}
            </div>
         </div>
      </Suspense>
   );
};

export default page;
