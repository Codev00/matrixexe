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
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
         />
         <div className="h-screen bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat">
            <div className="h-screen bg-black/30">{children}</div>
         </div>
      </section>
   );
}
