import favoritesApi from "@/api/modules/favoriteApi";
import { deleteFavorite } from "@/hook/user.slice";
import { Image, Tooltip } from "@nextui-org/react";
import NextImage from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FavoriteIcon = ({
   mediaId,
   favorite,
}: {
   mediaId: any;
   favorite: () => void;
}) => {
   const dispatch = useDispatch();
   const handleFavorites = async (mediaId: any) => {
      const { res, error } = await favoritesApi.unFavorites({ mediaId });
      if (res) {
         dispatch(deleteFavorite(mediaId));
         toast.success(`Delete Favorites @@`);
         favorite();
      }
      if (error) toast.error(error?.message);
   };
   return (
      <div className="w-[50px]">
         <Tooltip color="danger" content={"Unfavorite"} showArrow shadow="md">
            <Image
               as={NextImage}
               src="/images/bookmark.png"
               width={50}
               height={50}
               className="cursor-pointer"
               alt="bookmark"
               onClick={() => handleFavorites(mediaId)}
            />
         </Tooltip>
      </div>
   );
};

export default FavoriteIcon;
