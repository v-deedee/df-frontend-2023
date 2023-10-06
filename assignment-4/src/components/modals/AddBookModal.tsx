import { useRef, useEffect, useState } from 'react'

interface AddModalProps {
  isOpen: boolean
  closeModal: () => void
  addBook: (info: { name: string; author: string; topic: string }) => void
}

const AddBookModal: React.FC<AddModalProps> = ({
  isOpen,
  closeModal,
  addBook,
}) => {
  const [input, setInput] = useState({ name: '', author: '', topic: '' })

  const modalRef = useRef<HTMLDialogElement | null>(null)

  // Prevent closing modal on pressing 'Enter'
  const preventClose = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault()
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    closeModal()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (input.name === '') {
      alert('Please enter book name')
    } else if (input.author === '') {
      alert('Please enter author name')
    } else if (input.topic === '') {
      alert('Please enter book topic')
    } else {
      addBook(input)
      setInput({ name: '', author: '', topic: '' })
      closeModal()
    }
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
      className="sm:w-96 w-80 border-4 border-gray-500 p-2 sm:p-3 backdrop:bg-black backdrop:bg-opacity-40 dark:bg-zinc-800 dark:text-stone-300"
      onKeyDown={preventClose}
      role="presentation"
    >
      <h2 className="p-2 sm:p-3 text-xl sm:text-2xl font-bold">Add book</h2>
      <form>
        <div className="px-2 py-1 sm:p-3">
          <label htmlFor="name-input" className="text-sm font-bold">
            Name
            <input
              id="name-input"
              className="block w-full p-1.5 sm:p-2 font-normal border-2 border-solid border-gray-500 rounded dark:bg-neutral-100 dark:text-black"
              name="name"
              placeholder="Enter book name"
              onChange={handleInputChange}
              value={input.name}
            />
          </label>
        </div>
        <div className="px-2 py-1 sm:p-3">
          <label htmlFor="author-input" className="text-sm font-bold">
            Author
            <input
              id="author-input"
              className="block w-full p-1.5 sm:p-2 font-normal border-2 border-solid border-gray-500 rounded dark:bg-neutral-100 dark:text-black"
              name="author"
              placeholder="Enter author name"
              onChange={handleInputChange}
              value={input.author}
            />
          </label>
        </div>
        <div className="px-2 py-1 sm:p-3">
          <label htmlFor="topic-input" className="text-sm font-bold">
            Topic
            <input
              id="topic-input"
              className="block w-full p-1.5 sm:p-2 font-normal border-2 border-solid border-gray-500 rounded dark:bg-neutral-100 dark:text-black"
              name="topic"
              placeholder="Enter book topic"
              onChange={handleInputChange}
              value={input.topic}
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 p-3">
          <button
            value="cancel"
            className="py-2 px-4 border-none rounded bg-cyan-500 text-white text-sm font-bold hover:opacity-70 hover:text-black"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            value="create"
            className="py-2 px-4 border-none rounded bg-red-400 text-white text-sm font-bold hover:opacity-70 hover:text-black"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default AddBookModal
