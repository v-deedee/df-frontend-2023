'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    let state = ''
    const localData = localStorage.getItem('theme')
    try {
      state = localData === null ? 'light' : JSON.parse(localData)
    } catch (error) {
      console.error('error')
    }
    if (state === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    router.push('/home')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className="h-screen flex align-middle dark:bg-zinc-700">
      <div className="w-96 p-5 bg-white m-auto shadow-lg dark:bg-zinc-800 dark:border-4 border-gray-500">
        <h1 className="my-5 p-2 sm:p-3 text-4xl text-center text-rose-500 dark:text-rose-400 font-bold">
          Bookstore
        </h1>
        <form onSubmit={handleSubmit} className="p-3 flex flex-col gap-7">
          <label htmlFor="email" className="text-sm font-bold">
            Email (*)
            <input
              className="block w-full p-2 font-normal border-2 border-solid border-gray-500 rounded dark:bg-neutral-100 dark:text-black"
              id="email"
              type="email"
              name="user-email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              autoComplete="email"
            />
          </label>
          <label htmlFor="current-password" className="text-sm font-bold">
            Password (*)
            <input
              className="block w-full p-2 font-normal border-2 border-solid border-gray-500 rounded dark:bg-neutral-100 dark:text-black"
              id="current-password"
              type="password"
              name="user-password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              autoComplete="current-password"
              minLength={8}
            />
          </label>
          <button
            type="submit"
            className="w-full my-8 py-2 px-4 text-center border-none rounded bg-cyan-500 text-white text-sm font-bold hover:opacity-70 hover:text-black"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
