"use client";
import React from "react";

const Sidebar = () => {
   return (
      <div className="w-[300px] min-h-[500px] h-auto border-r-[1px] border-slate-900">
         <div
            className="w-full h-20 text-xl font-semibold flex items-center pl-10 text-slate-600 border-b-[1px] border-slate-950 cursor-pointer hover:bg-slate-950 transition-all duration-300 ease-linear group"
            onClick={() => console.log("setting")}
         >
            <div className="flex gap-3">
               <span className="flex items-center group-hover:text-danger-400 text-danger-400">
                  <i className="fi fi-sr-settings flex items-center"></i>{" "}
               </span>
               <span className="group-hover:text-slate-300 text-slate-300">
                  Setting
               </span>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
