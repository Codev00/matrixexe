import { Image, Tooltip } from "@nextui-org/react";
import NextImage from "next/image";
import React from "react";

const UnfavoriteIcon = () => {
   return (
      <div className="w-[50px] ">
         <Tooltip
            color="secondary"
            content={"Add Favorite"}
            showArrow
            shadow="md"
         >
            <Image
               as={NextImage}
               src="/images/bookmark-alt.png"
               width={50}
               height={50}
               className="cursor-pointer"
               alt="bookmark"
            />
         </Tooltip>
      </div>
   );
};

export default UnfavoriteIcon;
