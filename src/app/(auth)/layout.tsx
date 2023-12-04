import { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Image } from "@nextui-org/react";
import Logo from "@/assets/icon/Logo";
export const metadata: Metadata = {
   title: "Matrix | Sign In",
};
export default function AuthLayout({
   children, // will be a page or nested layout
}: {
   children: React.ReactNode;
}) {
   return (
      <section>
         <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
         />
         <div className="h-screen bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat signInBg">
            <div className="h-screen w-full bg-black/30">
               <div className="container bg-black/30 mb-2 h-[60px] w-full text-3xl flex  items-center gap-3 mx-2 md:mx-0">
                  <Logo />
                  <p className="font-bold text-inherit peer cursor-pointer">
                     MA{" "}
                     <span className="bg-danger px-2 rounded-md peer-hover:line-through">
                        TRIX
                     </span>
                  </p>
               </div>
               {children}
            </div>
         </div>
      </section>
   );
}
