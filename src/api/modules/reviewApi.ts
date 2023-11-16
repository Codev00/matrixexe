import privateClient from "../config/private.client";
import publicClient from "../config/public.client";

const reviewApi = {
   created: async ({ mediaId, userId, review }: any) => {
      try {
         const res = await publicClient.post(`/review/create`, {
            mediaId,
            userId,
            review,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   edited: async ({ review, id }: any) => {
      try {
         const res = await privateClient.put(`/review/update/${id}`, {
            review,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   deleted: async ({ id }: any) => {
      try {
         const res = await privateClient.delete(`/review/delete/${id}`);
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default reviewApi;
