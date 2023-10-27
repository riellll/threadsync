import Link from "next/link";
import ToggleTheme from "../theme/ToggleTheme";
import Login_LogOut from "./Login_LogOut";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  //  console.log(session);
  return (
    <nav className="flex fixed top-0 z-50 w-full sm:bg-gray-300 sm:dark:bg-gray-950 backdrop-blur-lg items-center border-gray-300">
      <div className="w-56 px-5 md:py-4 py-2.5 max-lg:w-16">
        {" "}
        <Link href="#" className="flex items-center">
          {/*          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          /> */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            T<span className="max-lg:hidden">hread</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              S<span className="max-lg:hidden">ync</span>
            </span>
          </h1>
        </Link>
      </div>
      <div className="flex flex-wrap grow px-5 md:py-4 items-center justify-end mx-auto py-2.5">
        <div className="flex items-center justify-between gap-8">
          <ToggleTheme />
          <Login_LogOut session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
