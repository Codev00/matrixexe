import { MovieType } from "@/types/media.type";

export const toTime = (time: number) => {
   const hours = Math.floor(time / 60);
   const minutes = time % 60;
   return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
};

const Zord = {
   random: (size: number) => {
      return Math.floor(Math.random() * size);
   },
};

const randomMovie = (size: number, list: MovieType[]) => {
   const result = [];
   const row: any = [];
   let flat = 0;
   while (flat < size) {
      const index = Zord.random(size);
      if (row.includes(index) === false) {
         result.push(list[index]);
         flat++;
      }
      row.push(index);
   }
   return result;
};

export default { toTime, randomMovie };
