import { useEffect, useRef } from 'react'

interface DelModalProps {
  isOpen: boolean
  closeModal: () => void
  selectedBook: { id: number; name: string }
  deleteBook: (id: number) => void
  handleNoBookPage: () => void
}

const DelBookModal: React.FC<DelModalProps> = ({
  isOpen,
  closeModal,
  selectedBook,
  deleteBook,
  handleNoBookPage,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null)

  // Prevent closing modal on pressing 'Enter'
  const preventClose = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault()
    }
  }

  const handleCloseModal = () => {
    closeModal()
  }

  const handleSubmit = () => {
    closeModal()
    handleNoBookPage()
    deleteBook(selectedBook.id)
  }

  useEffect(() => {
    const modalElement = modalRef.current

    if (modalElement) {
      if (isOpen) {
        modalElement.showModal()
      } else {
        modalElement.close()
      }
    }
  }, [isOpen])

  return (
    <dialog
      ref={modalRef}
      className="sm:w-96 w-80 text-center border-4 border-gray-500 p-3 backdrop:bg-black backdrop:bg-opacity-40 dark:bg-zinc-800 dark:text-stone-300"
      onKeyDown={preventClose}
      role="presentation"
    >
      <h2 className="p-2 sm:p-3 text-xl sm:text-2xl font-bold">Delete book</h2>
      <p className="p-4 sm:py-5 sm:px-10">
        Do you want to delete <b>{selectedBook.name}</b> book?
      </p>
      <div className="flex justify-center gap-2 p-3">
        <button
          value="cancel"
          className="py-2 px-4 border-none rounded bg-cyan-500 text-white text-sm font-bold hover:opacity-70 hover:text-black"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          value="delete"
          className="py-2 px-4 border-none rounded bg-red-400 text-white text-sm font-bold hover:opacity-70 hover:text-black"
          onClick={handleSubmit}
        >
          Delete
        </button>
      </div>
    </dialog>
  )
}

export default DelBookModal
