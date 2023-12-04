"use client";

import userApi from "@/api/modules/userApi";
import { EyeFilledIcon } from "@/assets/icon/EyeIcon";
import { EyeSlashFilledIcon } from "@/assets/icon/EyeSlashIcon";
import { setUser } from "@/hook/user.slice";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SignUp = ({ setSignIn }: { setSignIn: () => void }) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isVisible, setIsVisible] = React.useState(false);
   const toggleVisibility = () => setIsVisible(!isVisible);
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const { res, error } = await userApi.signup({
         username,
         password,
         confirmPassword,
      });
      setIsLoading(false);
      if (res) {
         dispatch(setUser(res));
         toast.success("Sign up success and log in");
         setTimeout(() => {
            router.push("/");
         }, 3000);
      }
      if (error) {
         toast.error(error?.errors);
         console.log(error);
      }
   };

   return (
      <div className="w-full h-full md:max-h-[610px] flex flex-col items-center justify-center ">
         <div className="h-full w-[400px]  bg-black/80 px-10 pb-5 rounded-2xl">
            <div className="h-[380px] mt-10">
               <h1 className=" text-white text-[32px] font-bold mb-[28px]">
                  Sign up
               </h1>
               <form onSubmit={handleSubmit}>
                  <div className="h-[66px] pb-4">
                     <Input
                        size="sm"
                        type="text"
                        label="username"
                        value={username}
                        autoComplete="off"
                        variant="bordered"
                        color="secondary"
                        isRequired
                        maxLength={15}
                        minLength={6}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </div>
                  <div className="h-[66px] pb-4">
                     <Input
                        size="sm"
                        label="password"
                        value={password}
                        autoComplete="off"
                        variant="bordered"
                        color="secondary"
                        isRequired
                        endContent={
                           <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                           >
                              {isVisible ? (
                                 <EyeSlashFilledIcon className="text-2xl text-secondary-500 pointer-events-none" />
                              ) : (
                                 <EyeFilledIcon className="text-2xl text-secondary-500 pointer-events-none" />
                              )}
                           </button>
                        }
                        type={isVisible ? "text" : "password"}
                        maxLength={15}
                        minLength={6}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <div className="h-[66px] pb-4">
                     <Input
                        size="sm"
                        label="password"
                        value={confirmPassword}
                        autoComplete="off"
                        variant="bordered"
                        color="secondary"
                        isRequired
                        endContent={
                           <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisibility}
                           >
                              {isVisible ? (
                                 <EyeSlashFilledIcon className="text-2xl text-secondary-500 pointer-events-none" />
                              ) : (
                                 <EyeFilledIcon className="text-2xl text-secondary-500 pointer-events-none" />
                              )}
                           </button>
                        }
                        type={isVisible ? "text" : "password"}
                        maxLength={15}
                        minLength={6}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </div>
                  <button
                     type="submit"
                     className="text-white font-bold bg-red-600 w-full h-[48px] rounded mt-4 mb-3 p-3 text-[16px]"
                  >
                     Sign Up
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
                     Bạn đã tham gia Matrix?{" "}
                  </span>
                  <span
                     className="hover:text-danger-400 cursor-pointer"
                     onClick={setSignIn}
                  >
                     Đăng nhập ngay
                  </span>
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
                     của Google, và được dùng để cung cấp, duy trì và cải thiện
                     dịch vụ reCAPTCHA cũng như các mục đích bảo mật nói chung
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SignUp;
