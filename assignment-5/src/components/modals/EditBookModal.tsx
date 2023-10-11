import { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookInfo, topics } from '../../sampleData'

interface EditModalProps {
  isOpen: boolean
  closeModal: () => void
  selectedBook: BookInfo
  editBook: (newBook: BookInfo) => void
}

const EditBookModal: React.FC<EditModalProps> = ({
  isOpen,
  closeModal,
  selectedBook,
  editBook,
}) => {
  const EditModalSchema = z.object({
    name: z
      .string()
      .min(1, 'Please enter book name')
      .min(5, 'Book name must have at least 5 characters'),
    author: z
      .string()
      .min(1, 'Please enter author name')
      .regex(/^[A-Za-z ]+$/, 'Author name contains only letters and spaces'),
    topic: z.string().min(1, 'Please select book topic'),
  })

  type EditModalSchemaType = z.infer<typeof EditModalSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditModalSchemaType>({
    resolver: zodResolver(EditModalSchema),
  })

  const modalRef = useRef<HTMLDialogElement | null>(null)

  // Prevent closing modal on pressing 'Esc'
  const preventClose = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
    }
  }

  const onSubmit = (data: EditModalSchemaType) => {
    editBook({
      id: selectedBook.id,
      ...data,
    })
    reset()
    closeModal()
  }

  useEffect(() => {
    const modalElement = modalRef.current

    if (modalElement) {
      if (isOpen) {
        setValue('name', selectedBook.name)
        setValue('author', selectedBook.author)
        setValue('topic', selectedBook.topic)
        modalElement.showModal()
      } else {
        modalElement.close()
      }
    }
  }, [isOpen, selectedBook, setValue])

  return (
    <dialog
      ref={modalRef}
      className="sm:w-96 w-80 border-4 border-gray-500 p-2 sm:p-3 backdrop:bg-black backdrop:bg-opacity-40 dark:bg-zinc-800 dark:text-stone-300"
      onKeyDown={preventClose}
      role="presentation"
    >
      <h2 className="p-2 sm:p-3 text-xl sm:text-2xl font-bold">Edit book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-2 py-1 sm:p-3">
          <label htmlFor="name-input" className="text-sm font-bold">
            Name
            <input
              className={`block w-full p-1.5 sm:p-2 font-normal border-2 border-solid border-gray-500 ${
                errors.name && 'border-red-500 outline-0'
              } rounded dark:bg-neutral-100 dark:text-black`}
              id="name-input"
              placeholder="Enter book name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </label>
        </div>
        <div className="px-2 py-1 sm:p-3">
          <label htmlFor="author-input" className="text-sm font-bold">
            Author
            <input
              className={`block w-full p-1.5 sm:p-2 font-normal border-2 border-solid border-gray-500 ${
                errors.author && 'border-red-500 outline-0'
              } rounded dark:bg-neutral-100 dark:text-black`}
              id="author-input"
              placeholder="Enter author name"
              {...register('author')}
            />
            {errors.author && (
              <p className="text-red-500 dark:text-red-400">
                {errors.author.message}
              </p>
            )}
          </label>
        </div>
        <div className="px-2 py-1 sm:p-3">
          <label htmlFor="topic-input" className="text-sm font-bold">
            Topic
            <select
              className={`block w-full p-1.5 sm:p-2 font-normal border-2 border-solid border-gray-500 ${
                errors.topic && 'border-red-500 outline-0'
              } rounded dark:bg-neutral-100 dark:text-black`}
              id="topic-input"
              {...register('topic')}
            >
              <option value="">Select topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            {errors.topic && (
              <p className="text-red-500 dark:text-red-400">
                {errors.topic.message}
              </p>
            )}
          </label>
        </div>
        <div className="flex justify-end gap-2 p-3">
          <button
            type="button"
            className="py-2 px-4 border-none rounded bg-cyan-500 text-white text-sm font-bold hover:opacity-70 hover:text-black"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 border-none rounded bg-red-400 text-white text-sm font-bold hover:opacity-70 hover:text-black"
          >
            Save
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default EditBookModal
