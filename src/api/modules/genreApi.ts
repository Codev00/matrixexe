import { GenreType } from "@/types/media.type";
import publicClient from "../config/public.client";

const genreApi = {
   list: async () => {
      try {
         const res = await publicClient.get<GenreType, GenreType>(
            "/genre/list"
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default genreApi;
