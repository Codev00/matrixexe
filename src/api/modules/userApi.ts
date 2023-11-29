import { UserType } from "@/types/user.type";
import privateClient from "../config/private.client";
import publicClient from "../config/public.client";

const userApi = {
   signin: async ({
      username,
      password,
   }: {
      username: string;
      password: string;
   }) => {
      try {
         const res = await publicClient.post("/user/signin", {
            username,
            password,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   signup: async ({
      username,
      password,
      confirmPassword,
   }: {
      username: string;
      password: string;
      confirmPassword: string;
   }) => {
      try {
         const res = await publicClient.post("user/signup", {
            username,
            password,
            confirmPassword,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   getInfo: async () => {
      try {
         const res = await privateClient.get("/user/info");
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   getUser: async ({ id }: { id: string }) => {
      try {
         const res = await publicClient.get<UserType, UserType>(
            `/user/info/${id}`
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   edit: async ({ id, name, newPassword }: any) => {
      try {
         const res = await privateClient.put(`/user/edit/${id}`, {
            name: name,
            newPassword: newPassword,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   premium: async (random: number) => {
      try {
         const vnp_Amount = 7236099;

         const res = await privateClient.post<any, any>("/payment/premium", {
            vnp_Amount: vnp_Amount,
            vnp_TxnRef: random,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default userApi;
