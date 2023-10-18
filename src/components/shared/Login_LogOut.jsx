"use client";

// import Image from "next/image";
// import logout from "../../../public/assets/logout.svg";
// import login from "../../../public/assets/login.svg";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const Login_LogOut = ({ session }) => {
    const router = useRouter()
    return (
      <>
        <div className="flex cursor-pointer gap-2 p-2 hover:bg-gradient-to-r hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700 rounded-lg group"
        onClick={() => session ? signOut("google", { callbackUrl: "/" }) : router.push('/login')}
        >
        <div className="mt-1 text-2xl font-normal text-gray-900 rounded group-hover:text-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:text-white"
            >
         {session ? <FiLogOut/> : <FiLogIn/>}
            </div>
         {/*  <Image
            src={session ? logout : login}
            alt="logout"
            width={24}
            height={24}
            className="text-black"
            onClick={() => session ? signOut("google", { callbackUrl: "/" }) : router.push('/login')}
          /> */}
          {session ? (
            <button
              type="submit"
              className="block py-2 pl-3 pr-4 mt-1 text-light-2 font-medium max-lg:hidden text-gray-900 rounded hover:bg-gray-100 group-hover:text-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            //   onClick={() => signOut("google", { callbackUrl: "/" })}
            >
              Logout
            </button>
          ) : (
            <p
              // type="submit"
              className="block py-2 pl-3 pr-4 mt-1 text-light-2 font-medium max-lg:hidden text-gray-900 rounded md:border-0 md:p-0 group-hover:text-gray-100 dark:text-white"
              // onClick={() => signOut("google", { callbackUrl: "/" })}
            >
              Login
            </p>
          )}
          {/* <p className='text-light-2 max-lg:hidden'>Logout</p> */}
        </div>
      </>
    );
  };
  
  export default Login_LogOut;