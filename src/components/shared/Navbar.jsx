import Link from "next/link";
import ToggleTheme from "../theme/ToggleTheme";


const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full h-16 bg-gray-100 border-gray-200 dark:bg-gray-950">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2.5">
        <Link href="#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Weave
          </span>
        </Link>

        <div className="flex items-center justify-between gap-8">
          <ToggleTheme/>
          <h1>signIn</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
