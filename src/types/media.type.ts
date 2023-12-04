import { UserType } from "./user.type";

export type GenreType = {
   _id: string;
   id: number;
   title: string;
};

export type VideoType = {
   _id: string;
   title: string;
   key: string;
   movie: string;
};

export type RateType = {
   _id: string;
   mediaId: string;
   userId: string;
   rating: number;
   createdAt: string;
   updatedAt: string;
};

export type ReviewType = {
   _id: string;
   mediaId: string;
   userId: UserType;
   review: string;
   createdAt: string;
};
export type MovieType = {
   _id: string;
   name: string;
   year: number;
   backdrop_path: string;
   poster_path: string;
   overview: string;
   runtime: number;
   views: number;
   release_date: string;
   direction: string[];
   actor: [];
   vote_point: number;
   vote_total: number;
   quality: string;
   status: string;
   genres: GenreType[];
   videos: VideoType[];
   rating: RateType[];
   reviews: ReviewType[];
};

export type resultType = {
   vnp_TmnCode: string;
   vnp_Amount: number;
   vnp_BankCode: string;
   vnp_BankTranNo: string;
   vnp_CardType: string;
   vnp_PayDate: string;
   vnp_OrderInfo: string;
   vnp_TransactionNo: number;
   vnp_ResponseCode: string;
   vnp_TransactionStatus: string;
   vnp_TxnRef: string;
   vnp_SecureHashType: string;
   vnp_SecureHash: string;
   isSuccess: boolean;
   message: string;
};
