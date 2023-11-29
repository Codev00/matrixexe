import reviewApi from "@/api/modules/reviewApi";
import { DeleteIcon } from "@/assets/icon/DeleteIcon";
import { EditIcon } from "@/assets/icon/EditIcon";
import { ReviewType } from "@/types/media.type";
import { UserType } from "@/types/user.type";
import { Avatar, AvatarIcon, Tooltip } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { format } from "timeago.js";

const UserReview = ({
   review,
   user,
   mediaId,
   deleted,
   edit,
}: {
   review: ReviewType;
   user: UserType;
   mediaId: string;
   deleted: () => void;
   edit: (value: any, id: any) => void;
}) => {
   const handleEdit = (value: any, id: any) => {
      edit(value, id);
   };
   const handleDelete = async (id: any) => {
      const { res, error } = await reviewApi.deleted({
         id,
         mediaId,
      });
      if (res) {
         toast.error("Delete Review !!!");
         deleted();
      }
      if (error) console.log(error);
   };
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
                  {review.userId.displayName}
               </h1>
               {user._id === review.userId._id && (
                  <div className="flex gap-2 items-center">
                     <Tooltip content="Edit" color="warning">
                        <span
                           className="text-base text-warning-400 cursor-pointer active:opacity-50"
                           onClick={() => handleEdit(review.review, review._id)}
                        >
                           <EditIcon />
                        </span>
                     </Tooltip>
                     <Tooltip color="danger" content="Delete">
                        <span
                           className="text-base text-danger cursor-pointer active:opacity-50"
                           onClick={() => handleDelete(review._id)}
                        >
                           <DeleteIcon />
                        </span>
                     </Tooltip>
                  </div>
               )}
            </div>
            <div className="whitespace-wrap text-sm w-full">
               <p className="">{review.review}</p>
            </div>
            <div>
               <span className="text-sm text-slate-500">
                  {format(review.createdAt)}
               </span>
            </div>
         </div>
      </div>
   );
};

export default UserReview;
