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
        <div className="h-full px-3 py-4 mt-3 overflow-y-auto bg-gray-200 border-gray-300 dark:bg-gray-950">
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
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 group ${
                      pathname === route && "bg-gray-100 dark:bg-gray-900"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-800 dark:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox={
                        item.label == "profile" ? "0 0 14 18" : "0 0 20 20"
                      }
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.imgURL}
                      />
                    </svg>
                    <span className="ml-3 max-lg:hidden">{item.label}</span>
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
