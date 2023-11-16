import { DeleteIcon } from "@/assets/icon/DeleteIcon";
import { EditIcon } from "@/assets/icon/EditIcon";
import { Avatar, AvatarIcon, Tooltip } from "@nextui-org/react";
import React from "react";

const UserReview = () => {
   return (
      <div className="flex gap-2">
         <div className="">
            <Avatar
               icon={<AvatarIcon />}
               classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                  icon: "text-black/80",
               }}
            />
         </div>
         <div>
            <div className=" flex gap-3">
               <h1 className="text-base font-semibold text-secondary-500">
                  Name
               </h1>
               <div className="flex gap-2 items-center">
                  <Tooltip content="Edit" color="warning">
                     <span className="text-base text-warning-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                     </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete">
                     <span className="text-base text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                     </span>
                  </Tooltip>
               </div>
            </div>
            <div className="whitespace-wrap text-sm w-full">
               <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  repudiandae maiores qui saepe ad officia possimus magni
                  tenetur repellendus dignissimos laudantium consequatur debitis
                  laborum earum eligendi architecto ipsum, nostrum dolor!
               </p>
            </div>
         </div>
      </div>
   );
};

export default UserReview;
