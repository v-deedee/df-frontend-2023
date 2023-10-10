import { useEffect, useState } from 'react'

interface PaginationProps {
  changePage: React.Dispatch<React.SetStateAction<number>>
  countPage: number
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({
  changePage,
  countPage,
  currentPage,
}) => {
  const [pagiStatus, setPagiStatus] = useState<Array<number | string>>([])

  useEffect(() => {
    let status: Array<number | string> = []
    if (countPage <= 5) {
      for (let i: number = 1; i <= countPage; i++) {
        status.push(i)
      }
    } else if (currentPage < 3) {
      status = [1, 2, 3, '...', countPage]
    } else if (currentPage > countPage - 2) {
      status = [1, '...', countPage - 2, countPage - 1, countPage]
    } else {
      status = ['...', currentPage - 1, currentPage, currentPage + 1, '...']
    }
    setPagiStatus(status)
  }, [countPage, currentPage])

  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(currentPage))
  }, [currentPage])

  return (
    <div className="flex justify-center py-5 px-1">
      <button
        className="w-6 xs:w-8 h-6 xs:h-8 text-xs xs:text-base mx-0.5 xs:pb-0.5 bg-white dark:bg-stone-800 border-2 border-solid border-gray-500 rounded font-bold hover:bg-red-400 dark:hover:bg-red-400 disabled:opacity-40 disabled:bg-white dark:disabled:bg-stone-800 disabled:cursor-not-allowed"
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
      >
        &#171;
      </button>

      <button
        className="w-6 xs:w-8 h-6 xs:h-8 text-xs xs:text-base mx-0.5 xs:pb-0.5 bg-white dark:bg-stone-800 border-2 border-solid border-gray-500 rounded font-bold hover:bg-red-400 dark:hover:bg-red-400 disabled:opacity-40 disabled:bg-white dark:disabled:bg-stone-800 disabled:cursor-not-allowed"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#60;
      </button>

      {pagiStatus.map((e, index) => {
        if (e === '...') {
          return (
            <button
              key={index}
              className="w-6 xs:w-8 h-6 xs:h-8 text-xs xs:text-sm mx-0.5 bg-white dark:bg-stone-800 border-2 border-solid border-gray-500 rounded font-bold opacity-60 cursor-not-allowed"
            >
              ...
            </button>
          )
        }
        return e === currentPage ? (
          <button
            key={index}
            className="w-6 xs:w-8 h-6 xs:h-8 text-xs xs:text-sm mx-0.5 bg-red-400 border-2 border-solid border-gray-500 rounded font-bold"
            onClick={() => changePage(Number(e))}
          >
            {e}
          </button>
        ) : (
          <button
            key={index}
            className="w-6 xs:w-8 h-6 xs:h-8 text-xs xs:text-sm mx-0.5 bg-white dark:bg-stone-800 border-2 border-solid border-gray-500 rounded font-bold hover:bg-red-400 dark:hover:bg-red-400"
            onClick={() => changePage(Number(e))}
          >
            {e}
          </button>
        )
      })}

      <button
        className="w-6 xs:w-8 h-6 xs:h-8 text-xs xs:text-base mx-0.5 xs:pb-0.5 bg-white dark:bg-stone-800 border-2 border-solid border-gray-500 rounded font-bold hover:bg-red-400 dark:hover:bg-red-400 disabled:opacity-40 disabled:bg-white dark:disabled:bg-stone-800 disabled:cursor-not-allowed"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === countPage}
      >
        &#62;
      </button>

      <button
        className="w-6 xs:w-8 h-6 xs:h-8 text-xs xs:text-base mx-0.5 xs:pb-0.5 bg-white dark:bg-stone-800 border-2 border-solid border-gray-500 rounded font-bold hover:bg-red-400 dark:hover:bg-red-400 disabled:opacity-40 disabled:bg-white dark:disabled:bg-stone-800 disabled:cursor-not-allowed"
        onClick={() => changePage(countPage)}
        disabled={currentPage === countPage}
      >
        &#187;
      </button>
    </div>
  )
}

export default Pagination
