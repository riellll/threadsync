'use client'

import { useRouter } from "next/navigation"

const BackArrow = () => {
    const router = useRouter()
  return (
    <button onClick={() => router.back()}>
    <svg
      className="w-5 h-5 text-gray-800 dark:text-white mt-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5H1m0 0 4 4M1 5l4-4"
      />
    </svg>
  </button>
  )
}

export default BackArrow