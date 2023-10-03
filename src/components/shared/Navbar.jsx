import Link from "next/link";
import ToggleTheme from "../theme/ToggleTheme";
import Login_LogOut from "./Login_LogOut";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const Navbar = async () => {
   const session = await getServerSession(authOptions);
  //  console.log(session);
  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-200 items-center border-gray-300 dark:bg-gray-950">
      <div className="flex flex-wrap px-5 md:py-4 items-center justify-between mx-auto py-2.5">
        <Link href="#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Thread<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Sync</span></h1>
        </Link>

        <div className="flex items-center justify-between gap-8">
          <ToggleTheme/>
          <Login_LogOut session={session}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
