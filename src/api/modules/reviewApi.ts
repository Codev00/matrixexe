import privateClient from "../config/private.client";
import publicClient from "../config/public.client";

const reviewApi = {
   created: async ({ mediaId, userId, review }: any) => {
      try {
         const res = await publicClient.post(`/api/v1/review/create`, {
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
            review: review,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   deleted: async ({ id, mediaId }: any) => {
      try {
         const res = await privateClient.put(`/review/delete/${id}`, {
            mediaId,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default reviewApi;
