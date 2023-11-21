import favoritesApi from "@/api/modules/favoriteApi";
import { Image, Tooltip } from "@nextui-org/react";
import NextImage from "next/image";
import React from "react";
import { toast } from "react-toastify";

const UnfavoriteIcon = ({
   mediaId,
   favorite,
}: {
   mediaId: any;
   favorite: () => void;
}) => {
   const handleUnFavorites = async (mediaId: any) => {
      const { res, error } = await favoritesApi.favorites({ mediaId });
      if (res) {
         toast.success(`Add Favorites !!!`);
         favorite();
      }
      if (error) toast.error(error?.message);
   };
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
               onClick={() => handleUnFavorites(mediaId)}
            />
         </Tooltip>
      </div>
   );
};

export default UnfavoriteIcon;
