import axios from "axios";
import queryString from "query-string";
import { getCookie } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const privateClient = axios.create({
   baseURL,
   paramsSerializer: {
      encode: (params) => queryString.stringify(params),
   },
});

privateClient.interceptors.request.use(async (config: any) => {
   return {
      ...config,
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${getCookie("acc_token")}`,
      },
   };
});

privateClient.interceptors.response.use(
   (response) => {
      if (response && response.data) {
         return response.data;
      }
      return response;
   },
   (error) => {
      throw error.response.data;
   }
);

export default privateClient;
