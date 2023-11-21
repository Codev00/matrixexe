"use client";
import Footer from "@/components/Footer";
import NavbarTop from "@/components/NavbarTop";
import "../globals.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/hook/user.slice";
import userApi from "@/api/modules/userApi";
import { toast } from "react-toastify";
import mediaApi from "@/api/modules/mediaApi";
import { setGenres, setListMovie } from "@/hook/global.slice";
import genreApi from "@/api/modules/genreApi";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
   const dispatch = useDispatch();
   useEffect(() => {
      (async () => {
         const { res, error } = await userApi.getInfo();
         if (res) dispatch(setUser(res));
         if (error) toast.error(error?.message);
      })();
   }, [dispatch]);
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listMedia();
         if (res) dispatch(setListMovie(res));
         if (error) toast.error(error?.message);
      })();
      (async () => {
         const { res, error } = await genreApi.list();
         if (res) dispatch(setGenres(res));
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
