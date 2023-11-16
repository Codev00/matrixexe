import publicClient from "../config/public.client";

const rateApi = {
   create: async ({ mediaId, userId, rating }: any) => {
      try {
         const res = await publicClient.post("/rated/created", {
            mediaId,
            userId,
            rating,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   // updated: async ({ mediaId, userId, rating }: any) => {
   //    try {
   //       const res = await publicClient.post("/rated/updated", {
   //          mediaId,
   //          userId,
   //          rating,
   //       });
   //       return { res };
   //    } catch (error: any) {
   //       return { error };
   //    }
   // },
};

export default rateApi;
