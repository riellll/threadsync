"use client";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const {data: session} = useSession();
  const pathname = usePathname();
  // console.log(session);
  return (
    <>
      <aside
        className="fixed top-16 left-0 z-40 w-56 h-screen transition-transform -translate-x-full md:translate-x-0 max-lg:w-16"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 mt-3 overflow-y-auto border-gray-300">
          <ul className="space-y-10 font-medium">
            {sidebarLinks.map((item) => {
              const route =
                item.route === "/profile"
                  ? `${item.route}/${session?.user?.id || '1234'}`
                  : item.route;
              return (
                <li key={item.label}>
                  <Link
                    href={route}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 group ${
                      pathname === route && "bg-gray-200 dark:bg-gray-800"
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox={`${item.label == "Profile" ? "0 0 14 18" : item.label == "Activity" ? "0 0 21 19" :"0 0 20 20"}`}
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.imgURL}
                      />
                    </svg>
                    <span className="ml-3 max-lg:hidden pt-2">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
