'use client'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import moon from '../../../public/moonn.svg'
import sun from '../../../public/sun.svg'



const ToggleTheme = () => {
    const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
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
    </button>
  )
}

export default ToggleTheme