"use client";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useRouter } from "next/navigation";

import React, { Suspense, useEffect, useState } from "react";

const Login = () => {
   const [status, setStatus] = useState("SignIn");
   const router = useRouter();
   useEffect(() => {
      router.refresh();
   }, []);
   return (
      <Suspense fallback={null}>
         {status === "SignIn" && (
            <SignIn setSignUp={() => setStatus("SignUp")} />
         )}
         {status === "SignUp" && (
            <SignUp setSignIn={() => setStatus("SignIn")} />
         )}
      </Suspense>
   );
};

export default Login;
