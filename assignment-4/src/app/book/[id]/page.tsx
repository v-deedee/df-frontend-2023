'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Header from '../../../components/Header'
import DelBookModal from '../../../components/modals/DelBookModal'
import { sampleData, BookInfo } from '../../../sampleData'

export default function Page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const searchKey: string = searchParams.get('q') || ''

  let bookList: Array<BookInfo> = sampleData
  try {
    const localData = localStorage.getItem('books')
    bookList = localData === null ? [...sampleData] : JSON.parse(localData)
  } catch (error) {
    console.error('error')
  }
  const index = bookList.findIndex((book) => book.id === Number(params.id))

  const [books, setBooks] = useState(bookList)

  const [modalOpen, setModalOpen] = useState(false)

  const [selectedBook, setSelectedBook] = useState({
    id: -1,
    name: 'test',
  })

  // Router for navigate back
  const router = useRouter()

  const showModal = (id: number, name: string) => {
    setSelectedBook({ id, name })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const deleteBook = () => {
    const newList = books.filter((book) => book.id !== Number(params.id))
    localStorage.setItem('books', JSON.stringify(newList))
    setBooks(newList)
    router.push(`/?q=${searchKey}`)
  }
  return (
    <>
      <Header />
      <main>
        {index === -1 ? (
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
        ) : (
          <div className="px-2 lg:px-16 sm:px-8 py-5">
            <Link
              href={`/?q=${searchKey}`}
              className="text-red-500 dark:text-red-400 text-lg hover:font-bold"
            >
              &#60; Back
            </Link>
            <h1 className="my-4 md:my-6 text-2xl sm:text-4xl font-bold">
              {bookList[index].name}
            </h1>
            <p className="sm:text-lg">
              <span className="font-bold">Author:</span>{' '}
              {bookList[index].author}
            </p>
            <p className="sm:text-lg">
              <span className="font-bold">Topic:</span> {bookList[index].topic}
            </p>
            <button
              className="underline underline-offset-2 my-3 text-red-500 dark:text-red-400 hover:no-underline hover:cursor-pointer hover:font-bold"
              onClick={() => showModal(index, bookList[index].name)}
            >
              Delete
            </button>
            <DelBookModal
              isOpen={modalOpen}
              closeModal={closeModal}
              selectedBook={selectedBook}
              deleteBook={deleteBook}
              handleNoBookPage={() => {}}
            />
          </div>
        )}
      </main>
    </>
  )
}
