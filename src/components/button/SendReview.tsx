import { Button } from "@nextui-org/react";
import React from "react";

const SendReview = () => {
   return (
      <div className="flex items-center justify-center h-[58px]">
         <Button variant="ghost" color="warning" radius="full">
            Send <i className="fi fi-rs-paper-plane"></i>
         </Button>
      </div>
   );
};

export default SendReview;
