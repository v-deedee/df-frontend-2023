import { useState } from 'react'
import AddBookModal from './modals/AddBookModal'

interface ActionBarProps {
  addBook: (info: { name: string; author: string; topic: string }) => void
  keyword: string
  setKeyword: React.Dispatch<React.SetStateAction<string>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  disabledSearch: boolean
}

const ActionBar: React.FC<ActionBarProps> = ({
  addBook,
  keyword,
  setKeyword,
  setCurrentPage,
  disabledSearch,
}) => {
  // Store status of modal
  const [modalOpen, setModalOpen] = useState(false)

  const showModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    const keyword = event.currentTarget.value
    setKeyword(keyword)
  }

  return (
    <div className="flex justify-end gap-1 sm:gap-3">
      <input
        type="search"
        placeholder="Search books"
        value={keyword}
        className="w-3/4 sm:w-2/5 md:w-1/3 lg:w-1/4 py-1.5 px-2 border-2 border-solid border-gray-400 rounded outline-offset-0 dark:bg-neutral-100 dark:text-black"
        onChange={search}
        disabled={disabledSearch}
      />
      <button
        className="w-1/4 sm:w-fit px-1 sm:px-4 border-none rounded bg-cyan-500 text-white text-xs xs:text-sm font-bold hover:opacity-70 hover:text-black"
        id="add-button"
        onClick={showModal}
      >
        Add book
      </button>
      <AddBookModal
        isOpen={modalOpen}
        closeModal={closeModal}
        addBook={addBook}
      />
    </div>
  )
}

export default ActionBar
