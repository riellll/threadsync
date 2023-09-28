"use client";
import Image from "next/image";
import Link from "next/link";
import home from "../../../public/assets/home.svg";
import search from "../../../public/assets/search.svg";
import creat from "../../../public/assets/create.svg";
import profile from "../../../public/assets/user.svg";
import { sidebarLinks } from "@/constants";
import { usePathname } from 'next/navigation'


const Sidebar = () => {
  const pathname = usePathname()
  return (
    <>
      <aside
        className="fixed top-16 left-0 z-40 w-56 h-screen transition-transform -translate-x-full md:translate-x-0 max-lg:w-16"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-950">
          <ul className="space-y-10 font-medium">
            {sidebarLinks.map((item) => {
              return (
                <li key={item.label}>
                <Link
                  href={item.route}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 group ${pathname === item.route && 'bg-gray-200 dark:bg-gray-900'}`}
                >
                 <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox={item.label == 'profile' ? "0 0 14 18" : "0 0 20 20"}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.imgURL}/>
    </svg>
                  <span className="ml-3 max-lg:hidden">{item.label}</span>
                </Link>
              </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
