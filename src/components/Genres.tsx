import { GenreType } from "@/types/media.type";
import { Chip } from "@nextui-org/react";
import React from "react";

const Genres = ({
   genres,
   size = "md",
}: {
   genres: GenreType[];
   size?: "lg" | "md" | "sm";
}) => {
   return (
      <div className="my-5">
         <div className="flex gap-3">
            {genres?.map((item, index) => (
               <Chip
                  key={index}
                  variant="shadow"
                  size={size}
                  classNames={{
                     base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-pink/50 shadow-pink-500/30",
                     content: "drop-shadow shadow-black text-white",
                  }}
               >
                  {item.title}
               </Chip>
            ))}
         </div>
      </div>
   );
};

export default Genres;
