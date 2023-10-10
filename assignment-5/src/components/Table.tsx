import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DelBookModal from './modals/DelBookModal'
import EditBookModal from './modals/EditBookModal'
import Pagination from './Pagination'
import Notification from './Notification'
import { BookInfo } from '../sampleData'

interface TableProps {
  listPerPage: BookInfo[][]
  deleteBook: (id: number) => void
  editBook: (newBook: BookInfo) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  isListEmpty: boolean
  keyword: string
}

const Table: React.FC<TableProps> = ({
  listPerPage,
  deleteBook,
  editBook,
  currentPage,
  setCurrentPage,
  isListEmpty,
  keyword,
}) => {
  // Router for navigation
  const router = useRouter()

  useEffect(() => {
    router.push(`/home/?q=${keyword}&page=${currentPage}`)
  }, [router, currentPage, keyword])

  // Store selected book for deleting
  const [selectedBook, setSelectedBook] = useState<BookInfo>({
    id: -1,
    name: '',
    author: '',
    topic: '',
  })

  // Store status of delete modal
  const [delModalOpen, setDelModalOpen] = useState(false)

  const showDelModal = (book: BookInfo) => {
    setSelectedBook(book)
    setDelModalOpen(true)
  }

  const closeDelModal = () => {
    setDelModalOpen(false)
  }

  // Store status of edit modal
  const [editModalOpen, setEditModalOpen] = useState(false)

  const showEditModal = (book: BookInfo) => {
    setSelectedBook(book)
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
  }

  // Prevent error when page is empty after delete
  const handleNoBookPage = () => {
    if (
      listPerPage[listPerPage.length - 1].length === 1 &&
      listPerPage[listPerPage.length - 1][0].id === selectedBook.id
    ) {
      setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1)
    }
  }

  return (
    <>
      <table className="w-full mt-3 p-2 text-xs xs:text-base bg-white dark:bg-stone-800 border-collapse">
        <thead>
          <tr>
            <th className="md:w-5/12 p-2 text-left bg-cyan-100 dark:bg-cyan-700 border-2 border-solid border-gray-500 dark:border-gray-400">
              Name
            </th>
            <th className="p-2 text-left bg-cyan-100 dark:bg-cyan-700 border-2 border-solid border-gray-500 dark:border-gray-400">
              Author
            </th>
            <th className="p-2 text-left bg-cyan-100 dark:bg-cyan-700 border-2 border-solid border-gray-500 dark:border-gray-400">
              Topic
            </th>
            <th className="w-1/5 p-2 text-left bg-cyan-100 dark:bg-cyan-700 border-2 border-solid border-gray-500 dark:border-gray-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listPerPage.length !== 0 &&
            listPerPage[currentPage - 1].map((book) => (
              <tr key={book.id}>
                <td className="md:w-5/12 p-2 border-2 border-solid border-gray-500 dark:border-gray-400">
                  {book.name}
                </td>
                <td className="p-2 border-2 border-solid border-gray-500 dark:border-gray-400">
                  {book.author}
                </td>
                <td className="p-2 border-2 border-solid border-gray-500 dark:border-gray-400">
                  {book.topic}
                </td>
                <td className="w-1/5 p-2 text-left border-2 border-solid border-gray-500 dark:border-gray-400">
                  <button
                    className="text-violet-600 dark:text-violet-400 underline underline-offset-2 md:border-r-2 dark:border-stone-700 px-2 hover:no-underline hover:cursor-pointer hover:font-bold"
                    onClick={() => showEditModal(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 dark:text-red-400 underline underline-offset-2 md:border-r-2 dark:border-stone-700 px-2 hover:no-underline hover:cursor-pointer hover:font-bold"
                    onClick={() => showDelModal(book)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-lime-600 dark:text-lime-400 underline underline-offset-2 px-2 hover:no-underline hover:cursor-pointer hover:font-bold"
                    onClick={() => {
                      router.push(`/book/${book.id}/?q=${keyword}`)
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isListEmpty && <Notification />}
      <EditBookModal
        isOpen={editModalOpen}
        closeModal={closeEditModal}
        selectedBook={selectedBook}
        editBook={editBook}
      />
      <DelBookModal
        isOpen={delModalOpen}
        closeModal={closeDelModal}
        selectedBook={selectedBook}
        deleteBook={deleteBook}
        handleNoBookPage={handleNoBookPage}
      />
      {listPerPage.length >= 2 && (
        <Pagination
          changePage={setCurrentPage}
          countPage={listPerPage.length}
          currentPage={currentPage}
        />
      )}
    </>
  )
}

export default Table
