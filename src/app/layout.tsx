import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/hook/Providers";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Matrix",
   description:
      "This website is dedicated to providing information about the latest and greatest movies. Whether you're looking for the next blockbuster to see in theaters or a classic film to stream at home, you'll find what you're looking for here. On our homepage, you can see highlights of some of the most popular and anticipated upcoming movie releases. We keep this section updated weekly so you always know what's new in cinema. We have numerous movie genres for you to browse, from action and adventure to comedy, drama, and more. Click on any genre to see all titles within that category. You can also search by movie title if you already know what you're looking for. For each movie, we provide an overview, cast and crew details, trailer videos, release date information, and links to buy or rent the film digitally. We also have movie reviews from professional critics to help you decide what's worth watching. In addition to new releases, we have a large collection of classic movies. Browse our catalog of films from the 1920s through 1990s and beyond. Relive your favorite oldies or discover a new favorite film from the past. Be sure to check out our movie news section for the latest industry headlines and interviews. Stay up to date on casting announcements, filming updates, and more movie buzz. We hope you find this website a helpful resource for all your movie needs. Enjoy exploring and don't forget to let us know if you have any other questions!",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" className="dark">
         <body className={`${inter.className} scrollbar-hide`}>
            <ToastContainer
               position="top-center"
               autoClose={1000}
               hideProgressBar={true}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               draggable
               theme="colored"
            />
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
