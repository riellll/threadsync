'use client'
// import home from '../../../public/assets/home.svg'
// import search from '../../../public/assets/search.svg'
// import creat from '../../../public/assets/create.svg'
// import profile from '../../../public/assets/user.svg'
import Link from 'next/link'
// import Image from 'next/image'
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Bottombar = () => {

  const {data: session} = useSession();
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 z-10 w-full backdrop-blur-lg xs:px-7 md:hidden">
    {/* <div className="flex items-center justify-between gap-3 xs:gap-5"> */}
    <ul className=" flex items-center justify-between gap-3 p-2 xs:gap-5 text-white">
    {sidebarLinks.map((item) => {
      const route =
      item.route === "/profile"
        ? `${item.route}/${session?.user?.id || '1234'}`
        : item.route;
      return (
         <li key={item.label}>
            <Link href={route} className={`relative flex flex-col items-center gap-1 rounded-lg p-1 sm:flex-1 sm:px-2 sm:py-2.5`}>
                    <svg
                      className={`w-6 h-6 ${
                        pathname === route ? "text-cyan-400" : 'text-gray-800 dark:text-gray-400'
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={"none"}
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

               {/* <span>{item.label}</span> */}
            </Link>
         </li>
      )
    })}
        {/*  <li>
            <Link href="/" className={`relative flex flex-col items-center gap-1 rounded-lg p-1 sm:flex-1 sm:px-2 sm:py-2.5 `}>
               <Image className="w-5 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                src={home}
                alt='heart'
                width={24}
                height={24}
                />

               <span>Home</span>
            </Link>
         </li>
         <li>
            <Link href="/search" className={`relative flex flex-col items-center gap-1 rounded-lg p-1 sm:flex-1 sm:px-2 sm:py-2.5`}>
               <Image className="w-5 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                src={search}
                alt='heart'
                width={24}
                height={24}
                />

               <span>Search</span>
            </Link>
         </li>
         <li>
            <Link href="/create-post" className={`relative flex flex-col items-center gap-1 rounded-lg p-1 sm:flex-1 sm:px-2 sm:py-2.5`}>
               <Image className="w-5 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                src={creat}
                alt='heart'
                width={24}
                height={24}
                />

               <span>Creat Post</span>
            </Link>
         </li>
         <li>
            <Link href={`/profile/`} className={`relative flex flex-col items-center gap-1 rounded-lg p-1 sm:flex-1 sm:px-2 sm:py-2.5`}>
               <Image className="w-5 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white"
                src={profile}
                alt='heart'
                width={24}
                height={24}
                />

               <span>Profile</span>
            </Link>
         </li> */}
      
      </ul>
    {/* </div> */}
</section>
  )
}

export default Bottombar