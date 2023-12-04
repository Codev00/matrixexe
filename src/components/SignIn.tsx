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

const SignIn = ({ setSignUp }: { setSignUp: () => void }) => {
   const Dispatch = useDispatch();
   const router = useRouter();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isVisible, setIsVisible] = React.useState(false);
   const toggleVisibility = () => setIsVisible(!isVisible);
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const { res, error } = await userApi.signin({ username, password });
      setIsLoading(false);
      if (res) {
         Dispatch(setUser(res));
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
      <div className="w-full h-full md:max-h-[610px] flex flex-col items-center justify-center ">
         <div className="h-full w-[400px]  bg-black/80 px-10 pb-0 rounded-2xl">
            <div className="h-[370px] mt-10">
               <h1 className=" text-white text-[32px] font-bold mb-[28px]">
                  Sign in
               </h1>
               <form onSubmit={handleSubmit} autoComplete="off">
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
                                 <EyeSlashFilledIcon className="text-2xl pointer-events-none text-secondary-500" />
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
                  <span
                     className="hover:text-danger-400 cursor-pointer"
                     onClick={setSignUp}
                  >
                     Đăng ký ngay
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

export default SignIn;
