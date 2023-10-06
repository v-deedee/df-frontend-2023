'use client'

import Link from 'next/link'
import Header from '../components/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <div className="px-2 lg:px-16 sm:px-8 py-5 my-32 text-center">
          <h1 className="text-7xl md:text-8xl font-bold my-5">404</h1>
          <p className="mb-8 md:mb-10 text-lg md:text-xl">Page not found</p>
          <Link
            href="/"
            className="text-lg md:text-xl text-red-500 dark:text-red-400 hover:font-bold"
          >
            &#60; Back to home page
          </Link>
        </div>
      </main>
    </>
  )
}
