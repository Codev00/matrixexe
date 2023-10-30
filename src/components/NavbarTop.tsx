"use client";
import { RootState } from "@/hook/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   Button,
   Link,
   NavbarMenu,
   NavbarMenuItem,
   NavbarMenuToggle,
   Dropdown,
   DropdownTrigger,
   Avatar,
   DropdownMenu,
   DropdownItem,
   Image,
   Tooltip,
} from "@nextui-org/react";
import { setActive } from "@/hook/global.slice";
import { logout, selectUser } from "@/hook/user.slice";
import { toast } from "react-toastify";
import ListGenre from "./ListGenre";
const NavbarTop = () => {
   const user = useSelector(selectUser);
   const [scroll, setScroll] = useState(0);
   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   const router = useRouter();
   const p = usePathname().split("/")[1];
   const menuItems = [
      { name: "Home", link: "/" },
      { name: "Movie", link: "/movie/list" },
      { name: "Genres", link: "/genres" },
      { name: "About", link: "/about" },
   ];
   const isActive = useSelector((state: RootState) => state.global.isActive);
   const dispatch = useDispatch();
   useEffect(() => {
      window.addEventListener("scroll", () => {
         setScroll(window.scrollY);
      });

      return () => {
         window.removeEventListener("scroll", () => {
            setScroll(window.scrollY);
         });
      };
   }, [scroll]);
   useLayoutEffect(() => {
      if (p === "") dispatch(setActive("Home"));
      if (p === "movie") dispatch(setActive("Movie"));
      if (p === "about") dispatch(setActive("About"));
   }, [p]);
   const handleLogout = () => {
      localStorage.removeItem("acc_token");
      dispatch(logout());
      toast.warning("You're log out");
   };
   return (
      <Navbar
         shouldHideOnScroll
         onMenuOpenChange={setIsMenuOpen}
         isBlurred={false}
         className={`${
            scroll === 0 ? "md:bg-transparent" : "bg-black/60"
         } bg-black/90 fixed `}
         classNames={{
            menuItem: ["hover:color-danger"],
            item: [
               "flex",
               "relative",
               "items-center",
               "text-3xl",
               "data-[active=true]:font-bold",
               "data-[active=true]:after:content-['']",
               "data-[active=true]:after:absolute",
               "data-[active=true]:after:bottom-0",
               "data-[active=true]:after:left-0",
               "data-[active=true]:after:right-0",
               "data-[active=true]:after:-bottom-1",
               "data-[active=true]:after:h-[2px]",
               "data-[active=true]:after:rounded-[3px]",
               "data-[active=true]:after:bg-danger",
               "transition-all",
               "duration-500",
               "ease-linear",
               "hover:color-danger",
            ],
         }}
      >
         <NavbarContent>
            <NavbarMenuToggle
               aria-label={isMenuOpen ? "Close menu" : "Open menu"}
               className="sm:hidden"
            />
            <NavbarBrand
               className="text-white text-2xl font flex gap-2 cursor-pointer"
               onClick={() => router.push("/")}
            >
               <Image
                  src="/images/wolf.png"
                  width={50}
                  height={50}
                  radius="none"
               />
               <p className="font-bold text-inherit peer cursor-pointer">
                  MA{" "}
                  <span className="bg-danger px-2 rounded-md peer-hover:line-through">
                     TRIX
                  </span>
               </p>
            </NavbarBrand>
         </NavbarContent>

         <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {menuItems.map((item, index) => (
               <NavbarItem
                  key={index}
                  isActive={isActive === item.name ? true : false}
                  className="cursor-pointer"
               >
                  {item.name === "Genres" ? (
                     <Tooltip
                        radius="none"
                        showArrow
                        shadow="lg"
                        content={<ListGenre />}
                     >
                        <Link aria-current="page" color="foreground" size="lg">
                           {item.name}
                        </Link>
                     </Tooltip>
                  ) : (
                     <Link
                        color={isActive === item.name ? "danger" : "foreground"}
                        aria-current="page"
                        onClick={() => {
                           if (item.name !== "Genres") {
                              dispatch(setActive(item.name));
                              router.push(item.link);
                           }
                        }}
                        size="lg"
                     >
                        {item.name}
                     </Link>
                  )}
               </NavbarItem>
            ))}
         </NavbarContent>
         <NavbarMenu>
            {menuItems.map((item, index) => (
               <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                     color={isActive === item.name ? "danger" : "foreground"}
                     className="w-full"
                     size="lg"
                     href={
                        item.name === "Home"
                           ? "/"
                           : item.name === "Movie"
                           ? "/movie/list"
                           : item.name === "TV/Series"
                           ? "/tv"
                           : "/about"
                     }
                  >
                     {item.name}
                  </Link>
               </NavbarMenuItem>
            ))}
         </NavbarMenu>
         {user.username !== "" ? (
            <NavbarContent as="div" justify="end">
               <Dropdown
                  placement="bottom-end"
                  showArrow
                  className="border-[1px] border-danger-500 bg-slate-900"
               >
                  <DropdownTrigger>
                     <Avatar
                        isBordered
                        as="button"
                        className="transition-transform object-cover"
                        color="danger"
                        size="md"
                        src="/images/avatar.svg"
                     />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                     <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">{user.displayName}</p>
                        <p className="font-normal">@{user.username}</p>
                     </DropdownItem>
                     <DropdownItem
                        key="favorite"
                        onClick={() =>
                           router.push(`/user/${user.username}/favorites`)
                        }
                     >
                        Favorites
                     </DropdownItem>
                     <DropdownItem key="setting">Setting</DropdownItem>
                     <DropdownItem
                        key="logout"
                        color="danger"
                        onClick={() => handleLogout()}
                     >
                        Log Out
                     </DropdownItem>
                  </DropdownMenu>
               </Dropdown>
            </NavbarContent>
         ) : (
            <NavbarContent justify="end">
               <NavbarItem className="hidden lg:flex">
                  <Link href="/sign-in" color="danger">
                     Login
                  </Link>
               </NavbarItem>
               <NavbarItem>
                  <Button
                     as={Link}
                     color="danger"
                     href="/sign-up"
                     variant="flat"
                  >
                     Sign Up
                  </Button>
               </NavbarItem>
            </NavbarContent>
         )}
      </Navbar>
   );
};

export default NavbarTop;
