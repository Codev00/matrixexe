import { UserType } from "@/types/user.type";
import privateClient from "../config/private.client";
import publicClient from "../config/public.client";
import { resultType } from "@/types/media.type";

const userApi = {
   signin: async ({
      username,
      password,
   }: {
      username: string;
      password: string;
   }) => {
      try {
         const res = await publicClient.post("/api/v1/user/signin", {
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
         const res = await publicClient.post("/api/v1/user/signup", {
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
         const res = await privateClient.get<UserType, UserType>(
            "/api/v1/user/info"
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   getUser: async ({ id }: { id: string }) => {
      try {
         const res = await publicClient.get<UserType, UserType>(
            `/api/v1/user/info/${id}`
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   edit: async ({ id, name, password, newPassword }: any) => {
      try {
         const res = await privateClient.put(`/api/v1/user/edit/${id}`, {
            name: name,
            password: password,
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

         const res = await privateClient.post<any, any>(
            "/api/v1/payment/premium",
            {
               vnp_Amount: vnp_Amount,
               vnp_TxnRef: random,
            }
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   checkPayment: async ({
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
      vnp_SecureHash,
   }: any) => {
      try {
         const res = await privateClient.get<resultType, resultType>(
            `/api/v1/payment/check-payment?vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_BankTranNo=${vnp_BankTranNo}&vnp_CardType=${vnp_CardType}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_PayDate=${vnp_PayDate}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TmnCode=${vnp_TmnCode}&vnp_TransactionNo=${vnp_TransactionNo}&vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_TxnRef=${vnp_TxnRef}&vnp_SecureHash=${vnp_SecureHash}`
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   createBill: async ({ amount, userId }: any) => {
      try {
         const res = await privateClient.post<any, any>(
            "/api/v1/payment/userPayment",
            {
               amount,
               userId,
            }
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default userApi;
