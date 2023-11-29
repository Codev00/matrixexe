import {
   Avatar,
   AvatarIcon,
   Button,
   Chip,
   Link,
   Textarea,
   Tooltip,
   User,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import UserReview from "./UserReview";
import { UserType } from "@/types/user.type";
import { ReviewType } from "@/types/media.type";
import reviewApi from "@/api/modules/reviewApi";
import { toast } from "react-toastify";

const Comments = ({
   user,
   reviews,
   mediaId,
   callBack,
}: {
   user: UserType;
   reviews?: ReviewType[];
   mediaId: string;
   callBack: () => void;
}) => {
   const [comment, setComment] = useState("");
   const [edit, setEdit] = useState("");
   const [page, setPage] = useState(1);
   const rowPerPage = 4;
   const handleSubmit = async () => {
      const { res, error } = await reviewApi.created({
         mediaId,
         userId: user._id,
         review: comment,
      });
      if (res) {
         toast.success("Review completed");
         setComment("");
         callBack();
      }
      if (error) console.log(error);
   };
   const handleEdit = async ({ review, id }: any) => {
      const { res, error } = await reviewApi.edited({
         review: review,
         id: id,
      });
      if (res) {
         toast.info("Update Review");
         setComment("");
         setEdit("");
         callBack();
      }
      if (error) console.log(error);
   };
   const items: ReviewType[] | undefined = useMemo(() => {
      const start = 0;
      const add = (page - 1) * rowPerPage;
      const end = add + rowPerPage;
      return reviews
         ?.sort((a: ReviewType, b: ReviewType) => {
            return (
               new Date(b?.createdAt).valueOf() -
               new Date(a?.createdAt).valueOf()
            );
         })
         .slice(start, end);
   }, [page, reviews]);

   return (
      <div className="container">
         <div className="px-4 md:px-0">
            <div className="my-2 border-b-3 border-danger-400 w-full md:w-[75%]">
               <h1 className="text-xl italic font-semibold">Reviews</h1>
            </div>
            <div className="bg-slate-950 rounded-xl  py-2 h-auto min-h-[200px] w-full md:w-[75%] flex flex-col gap-4 ">
               <div>
                  <div className="whitespace-wrap h-auto flex flex-col gap-7 px-4 text-justify">
                     {reviews?.length === 0 && (
                        <div className="text-center">
                           <h1 className="text-2xl font-semibold text-secondary-500">
                              No Reviews
                           </h1>
                        </div>
                     )}
                     {items?.map((item, index) => (
                        <UserReview
                           key={index}
                           review={item}
                           user={user}
                           mediaId={mediaId}
                           deleted={() => {
                              callBack();
                           }}
                           edit={(value: any, id: any) => {
                              setComment(value);
                              setEdit(id);
                           }}
                        />
                     ))}
                  </div>
                  <div className="w-full flex items-center justify-center mt-4">
                     {items?.length === reviews?.length ? (
                        <Button
                           variant="ghost"
                           color="secondary"
                           onClick={() => setPage(1)}
                        >
                           Recall
                        </Button>
                     ) : (
                        <Button
                           variant="ghost"
                           color="warning"
                           onClick={() => setPage(page + 1)}
                        >
                           Load more
                        </Button>
                     )}
                  </div>
               </div>
               <div className="flex gap-2 items-start mx-3 border-t-1 border-slate-600 pt-2 px-1">
                  <div>
                     <Avatar
                        icon={<AvatarIcon />}
                        classNames={{
                           base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                           icon: "text-black/80",
                        }}
                     />
                  </div>
                  <div className="w-full flex items-center gap-2">
                     <Textarea
                        variant="flat"
                        placeholder="Enter your review"
                        minRows={1}
                        color="warning"
                        className="w-full"
                        size="lg"
                        fullWidth={true}
                        value={comment}
                        onValueChange={setComment}
                        classNames={{
                           base: "p-0",
                           label: "p-0",
                           input: "p-0",
                           innerWrapper: "p-0",
                        }}
                     />
                     <div className="flex items-center justify-center h-[58px]">
                        {edit ? (
                           <div className="flex gap-2 items-center">
                              <Tooltip content={"Cancel"} color="danger">
                                 <Chip
                                    color="danger"
                                    variant="light"
                                    className="cursor-pointer"
                                    onClose={() => {
                                       setEdit("");
                                       setComment("");
                                    }}
                                 ></Chip>
                              </Tooltip>
                              <Button
                                 variant="ghost"
                                 color="warning"
                                 radius="full"
                                 onClick={() =>
                                    handleEdit({ review: comment, id: edit })
                                 }
                              >
                                 Send <i className="fi fi-rs-paper-plane"></i>
                              </Button>
                           </div>
                        ) : (
                           <Button
                              variant="ghost"
                              color="warning"
                              radius="full"
                              onClick={handleSubmit}
                           >
                              Send <i className="fi fi-rs-paper-plane"></i>
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Comments;
