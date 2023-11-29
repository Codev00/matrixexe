import Sidebar from "@/components/Sidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="pt-[60px] container">
         <div className="w-full flex items-center justify-center my-10 text-2xl text-slate-300 font-bold">
            <h1>Account Controller</h1>
         </div>
         <div className="min-h-[500px] flex gap-5">
            <Sidebar />
            {children}
         </div>
      </div>
   );
};

export default UserLayout;
