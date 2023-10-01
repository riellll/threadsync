"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import moon from "../../../public/moonn.svg";
import sun from "../../../public/sun.svg";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useState } from "react";

const ToggleTheme = () => {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();
  const [lds, setlds] = useState(resolvedTheme)
  console.log(lds);
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Image
            className="text-white cursor-pointer"
            src={resolvedTheme === "dark" ? moon : sun}
            width={20}
            height={20}
            alt="moon&sun"
          />
        </MenubarTrigger>
        <MenubarContent>
        <MenubarItem>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className={`fill-sky-400/20 ${lds === 'light' ? 'stroke-sky-500' : 'stroke-slate-500'}`}></path><path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" className={`${lds === 'light' ? 'stroke-sky-500' : 'stroke-slate-500'}`}></path></svg>
            <button
              type="submit"
              className="block grow text-start text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => {setTheme("light"), setlds('light')}}
            >
              Light
            </button>
          </MenubarItem>
          <MenubarItem>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 64 64" version="1.1"><path d="" stroke="none" fill="#080404" fillRule="evenodd"/><path d="M 50.420 7.587 L 47.500 10.673 50.500 13.587 L 53.500 16.500 56.500 13.500 L 59.500 10.500 56.420 7.500 L 53.340 4.500 50.420 7.587 M 11.982 12.018 C 6.505 17.495, 3.977 23.370, 3.871 30.866 C 3.579 51.651, 22.162 65.089, 42.057 58.481 C 46.724 56.931, 56.919 48.585, 55.670 47.337 C 55.375 47.042, 53.464 47.352, 51.422 48.026 C 43.498 50.641, 31.749 47.867, 24.337 41.631 C 17.171 35.600, 13.074 21.367, 15.974 12.578 C 16.648 10.536, 16.967 8.634, 16.683 8.350 C 16.399 8.066, 14.284 9.716, 11.982 12.018 M 30.672 15.161 L 27.860 18.014 30.694 20.848 L 33.527 23.681 36.243 20.925 L 38.960 18.168 36.222 15.238 L 33.485 12.307 30.672 15.161 M 46.139 27.555 C 44.970 28.900, 43.548 30, 42.978 30 C 42.409 30, 43.392 31.463, 45.162 33.250 L 48.380 36.500 51.190 33.673 L 54 30.846 51.132 27.978 L 48.264 25.111 46.139 27.555" stroke="none" fill={`${lds === 'dark' ? '#0ea5e9' : '#64748b'}`}  fillRule="evenodd"/></svg>
          <button
              type="submit"
              className="block grow text-start text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => {setTheme("dark"), setlds('dark')}}
            >
              Dark
            </button>
          </MenubarItem>
          <MenubarItem>
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mr-2"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" strokeWidth="2" strokeLinejoin="round" className={`${lds === 'system' ? 'stroke-sky-500' : 'stroke-slate-500'} dark:stroke-slate-500`}></path><path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" strokeWidth="2" strokLinecap="round" strokeLinejoin="round" className={`${lds === 'system' ? 'stroke-sky-500' : 'stroke-slate-500'} dark:stroke-slate-500`}></path></svg>
            <button
              type="submit"
              className="block grow text-start text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => {setTheme("system"), setlds('system')}}
            >
              System
            </button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    /*  <button
      id="theme-toggle"
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-2 mr-5"
    >
     <Image
     className='text-white'
     src={resolvedTheme === "dark" ? sun : moon}
     width={25}
     height={25}
     alt='moon&sun'
     />
    </button> */
  );
};

export default ToggleTheme;
