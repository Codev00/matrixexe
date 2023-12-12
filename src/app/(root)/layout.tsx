import Footer from "@/components/Footer";
import NavbarTop from "@/components/NavbarTop";
import "../globals.css";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <section className="overflow-x-hidden bg-payment">
         <NavbarTop />
         {children}
         <div className="h-[50px]"></div>
         <Footer />
      </section>
   );
};

export default HomeLayout;
