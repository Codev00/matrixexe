"use client";
import Footer from "@/components/Footer";
import NavbarTop from "@/components/NavbarTop";
import "../globals.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/hook/user.slice";
import userApi from "@/api/modules/userApi";
import { toast } from "react-toastify";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
   const dispatch = useDispatch();
   const user = useSelector(selectUser);
   useEffect(() => {
      (async () => {
         const { res, error } = await userApi.getInfo();
         if (res) dispatch(setUser(res));
         if (error) toast.error(error?.message);
      })();
   }, [dispatch]);
   return (
      <section className="overflow-x-hidden">
         <NavbarTop />
         {children}
         <Footer />
      </section>
   );
};

export default HomeLayout;
