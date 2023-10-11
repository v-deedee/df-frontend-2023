'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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

  const [showPassword, setShowPassword] = useState(false)

  const signInSchema = z.object({
    userEmail: z.string().min(1, 'Email is required').email(),
    userPassword: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must contain at least 8 character')
      .regex(/^(?=.*[A-Z]).*$/, 'Password must contain at least 1 uppercase')
      .regex(
        /^(?=.*[@#$%^&+!=]).*$/,
        'Password must contain at least 1 symbol',
      ),
  })

  type TSignInSchema = z.infer<typeof signInSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = () => {
    router.push('/home')
    // reset()
  }

  return (
    <main className="h-screen flex align-middle dark:bg-zinc-700">
      <div className="w-96 p-5 bg-white m-auto shadow-lg dark:bg-zinc-800 dark:border-4 border-gray-500">
        <h1 className="my-5 p-2 sm:p-3 text-4xl text-center text-rose-500 dark:text-rose-400 font-bold">
          Bookstore
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 flex flex-col gap-7"
        >
          <label htmlFor="email" className="text-sm font-bold">
            Email (*)
            <input
              className={`block w-full p-2 font-normal border-2 border-solid border-gray-500 ${
                errors.userEmail && 'border-red-500 outline-0'
              } rounded dark:bg-neutral-100 dark:text-black`}
              id="email"
              placeholder="Enter your email. eg: example@gmail.com"
              {...register('userEmail')}
              // autoComplete="email"
            />
            {errors.userEmail && (
              <p className="mt-1 text-red-500 dark:text-red-400">
                {errors.userEmail.message}
              </p>
            )}
          </label>
          <label htmlFor="current-password" className="text-sm font-bold">
            Password (*)
            <input
              className={`block w-full p-2 font-normal border-2 border-solid border-gray-500 ${
                errors.userPassword && 'border-red-500 outline-0'
              } rounded dark:bg-neutral-100 dark:text-black`}
              id="current-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('userPassword')}
              // autoComplete="current-password"
            />
            {errors.userPassword && (
              <p className="mt-1 text-red-500 dark:text-red-400">
                {errors.userPassword.message}
              </p>
            )}
          </label>
          <label
            htmlFor="pw-toggle"
            className="flex gap-1 text-sm w-fit hover:cursor-pointer"
          >
            <input
              className="w-3.5 hover:cursor-pointer"
              type="checkbox"
              id="pw-toggle"
              // checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show password
          </label>
          <button
            type="submit"
            className="w-full mb-8 py-2 px-4 text-center border-none rounded bg-cyan-500 text-white text-sm font-bold hover:opacity-70 hover:text-black disabled:opacity-40 disabled:hover:text-white"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
