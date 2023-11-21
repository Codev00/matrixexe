import privateClient from "../config/private.client";

const favoritesApi = {
   favorites: async ({ mediaId }: any) => {
      try {
         const res = await privateClient.post("/user/favorites", {
            mediaId: mediaId,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   unFavorites: async ({ mediaId }: any) => {
      try {
         const res = await privateClient.delete(`/user/unfavorites/${mediaId}`);
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default favoritesApi;
