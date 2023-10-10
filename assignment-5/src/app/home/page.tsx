'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import ActionBar from '../../components/ActionBar'
import Table from '../../components/Table'
import { sampleData, BookInfo } from '../../sampleData'

export default function Home() {
  // Initialize book list
  const [books, setBooks] = useState<{
    next_id: number
    list: Array<BookInfo>
  }>({
    next_id: -1,
    list: [],
  })
  // Get local data
  useEffect(() => {
    let bookList: Array<BookInfo> = sampleData
    const localBooks = localStorage.getItem('books')
    try {
      bookList = localBooks === null ? [...sampleData] : JSON.parse(localBooks)
    } catch (error) {
      console.error('Failed to load local book list')
    }
    setBooks({
      next_id: bookList.length === 0 ? 1 : bookList[bookList.length - 1].id + 1,
      list: bookList,
    })
  }, [])

  // Get search query
  const searchParams = useSearchParams()
  // Store search keyword
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')

  // Store current page for pagination
  const [currentPage, setCurrentPage] = useState(1)
  // Get local data
  useEffect(() => {
    let page = 1
    const localPage = localStorage.getItem('page')
    try {
      page = localPage === null ? 1 : JSON.parse(localPage)
    } catch (error) {
      console.error('Failed to load local page')
    }
    setCurrentPage(Number(page))
  }, [])

  // Store book list for rendering in each page
  const [listPerPage, setListPerPage] = useState<Array<Array<BookInfo>>>([])
  useEffect(() => {
    const temp: Array<Array<BookInfo>> = []

    for (let i = 0; i < books.list.length; i = i + 5) {
      temp.push(books.list.slice(i, i + 5))
    }
    setListPerPage(temp)
  }, [books.list])

  // Store status of 'No book' notification
  const isListEmpty = useMemo(() => listPerPage.length === 0, [listPerPage])

  // Update page when book list changes (when add, delete)
  function updatePage(newList: Array<BookInfo>) {
    const temp: Array<Array<BookInfo>> = []
    for (let i = 0; i < newList.length; i = i + 5) {
      temp.push(newList.slice(i, i + 5))
    }
    setListPerPage(temp)
  }

  // Add new book with book information (name, author, topic)
  const addBook = (info: Omit<BookInfo, 'id'>) => {
    const newBook: BookInfo = {
      id: books.next_id,
      ...info,
    }
    const newList = [...books.list, newBook]

    updatePage(
      newList.filter((book) =>
        book.name.toLowerCase().includes(keyword.toLowerCase()),
      ),
    )

    localStorage.setItem('books', JSON.stringify(newList))
    setBooks({
      next_id: books.next_id + 1,
      list: newList,
    })
  }

  // Delete book with given id
  const deleteBook = (id: number) => {
    const newList = books.list.filter((book) => book.id !== id)

    updatePage(
      newList.filter((book) =>
        book.name.toLowerCase().includes(keyword.toLowerCase()),
      ),
    )

    localStorage.setItem('books', JSON.stringify(newList))
    setBooks({
      next_id: books.next_id,
      list: newList,
    })
  }

  // Edit book with given id
  const editBook = (newBook: BookInfo) => {
    const newList = [...books.list]

    newList[newList.findIndex((book) => book.id === newBook.id)] = {
      ...newBook,
    }

    localStorage.setItem('books', JSON.stringify(newList))
    setBooks({
      next_id: books.next_id,
      list: newList,
    })
  }

  // Handle search event
  useEffect(() => {
    const temp = books.list.filter((book) =>
      book.name.toLowerCase().includes(keyword.toLowerCase()),
    )
    updatePage(temp)
  }, [books.list, keyword]) // run when keyword changes

  return (
    <>
      <Header />
      <hr className="border border-solid border-gray-400" />
      <main className="py-6 sm:py-8 px-2 lg:px-16 sm:px-8">
        <ActionBar
          addBook={addBook}
          keyword={keyword}
          setKeyword={setKeyword}
          setCurrentPage={setCurrentPage}
          disabledSearch={books.list.length === 0}
        />
        <Table
          listPerPage={listPerPage}
          deleteBook={deleteBook}
          editBook={editBook}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isListEmpty={isListEmpty}
          keyword={keyword}
        />
      </main>
    </>
  )
}
