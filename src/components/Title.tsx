import React from "react";
import localFont from "next/font/local";

const myFont = localFont({
   src: "../assets/fonts/FirstChristmas-M8av.ttf",
   display: "swap",
});

const Title = ({
   children,
   className,
}: {
   children: React.ReactNode;
   className: string;
}) => {
   return (
      <h1
         className={`${className} ${myFont.className} text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-violet-500 to-pink-600`}
      >
         {children}
      </h1>
   );
};

export default Title;
