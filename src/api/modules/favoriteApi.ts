import privateClient from "../config/private.client";

const favoritesApi = {
   favorites: async ({ mediaId }: any) => {
      try {
         const res = await privateClient.post("/api/v1/user/favorites", {
            mediaId: mediaId,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   unFavorites: async ({ mediaId }: any) => {
      try {
         const res = await privateClient.delete(`/api/v1/user/unfavorites/${mediaId}`);
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default favoritesApi;
