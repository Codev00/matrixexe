import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         fontFamily: {
            title: ["var(--font-title)"],
         },
      },
      container: {
         center: true,
         padding: {
            sm: "2rem",
            md: "2rem",
            lg: "10rem",
            xl: "15rem",
         },
      },
   },
   darkMode: "class",
   plugins: [require("tailwind-scrollbar-hide"), nextui()],
};
export default config;
