"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Payment = () => {
   const pathname = usePathname();
   console.log(pathname);

   return <div>Paymen Success</div>;
};

export default Payment;
