import Image from 'next/image'

const Notification = () => {
  return (
    <div className="flex flex-col items-center bg-zinc-200">
      <Image
        src="/empty-icon.svg"
        alt="icon"
        width={120}
        height={120}
        priority
      />
      {/* {type === 'search' ? (
        <p>No books match your search</p>
      ) : (
        <p>No books available</p>
      )} */}
      {/* <p className="mb-5 text-xl text-gray-500 font-bold">
        {type === 'search'
          ? 'No books match your search'
          : 'No books available'}
      </p> */}
      <p className="mb-5 text-xl text-gray-500 font-bold">
        No books match your search
      </p>
    </div>
  )
}

export default Notification
