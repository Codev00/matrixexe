import { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
   title: "Matrix | Login",
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
            theme="colored"
         />
         <div className="h-screen bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat">
            <div className="h-screen bg-black/30">{children}</div>
         </div>
      </section>
   );
}
