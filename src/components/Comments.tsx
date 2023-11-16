import {
   Avatar,
   AvatarIcon,
   Button,
   Link,
   Textarea,
   User,
} from "@nextui-org/react";
import React from "react";
import UserReview from "./UserReview";
import SendReview from "./button/SendReview";
import { UserType } from "@/types/user.type";

const Comments = ({ user }: { user: UserType }) => {
   return (
      <div className="container">
         <div className="px-4 md:px-0">
            <div className="my-2 border-b-3 border-danger-400 w-full md:w-[75%]">
               <h1 className="text-xl italic font-semibold">Reviews</h1>
            </div>
            <div className="bg-slate-950 rounded-xl  py-2 h-auto min-h-[200px] w-full md:w-[75%] flex flex-col gap-4 ">
               <div>
                  <div className="whitespace-wrap h-auto flex flex-col gap-2 px-4 text-justify">
                     <UserReview />
                     <UserReview />
                     <UserReview />
                     <UserReview />
                     <UserReview />
                  </div>
                  <div className="w-full flex items-center justify-center mt-4">
                     <Button variant="ghost" color="warning">
                        Load more
                     </Button>
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
                        classNames={{
                           base: "p-0",
                           label: "p-0",
                           input: "p-0",
                           innerWrapper: "p-0",
                        }}
                     />
                     <SendReview />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Comments;
