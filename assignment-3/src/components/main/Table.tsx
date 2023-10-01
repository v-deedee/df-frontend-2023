import { useState } from 'react';
import DelBookDialog from './modals/DelBookModal';
import Pagination from './Pagination';
import Notification from './Notification';
import { BookInfo } from '../../SampleData';

interface TableProps {
  listPerPage: BookInfo[][],
  deleteBook: (id: number) => void,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  Noti: string
}

const Table: React.FC<TableProps> = ({ listPerPage, deleteBook, currentPage, setCurrentPage, Noti }) => {
  // Store selected book for deleting
  const [selectedBook, setSelectedBook] = useState({
    id: -1,
    name: 'test'
  });

  // Store status of modal
  const [modalOpen, setModalOpen] = useState(false);

  // Prevent error when page is empty after delete
  const handleNoBookPage = () => {
    if (listPerPage[listPerPage.length - 1].length === 1
      && listPerPage[listPerPage.length - 1][0].id === selectedBook.id) {
      setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
    }
  }

  const showModal = (id: number, name: string) => {
    setSelectedBook({ id, name });
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='name'>Name</th>
            <th>Author</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { listPerPage.length !== 0 && listPerPage[currentPage - 1].map(book => (
            <tr key={book.id}>
              <td className='name'>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.topic}</td>
              <td className='action' onClick={() => showModal(book.id, book.name)}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
      { Noti !== '' && <Notification type={Noti}/>}
      <DelBookDialog
        isOpen={modalOpen}
        closeModal={closeModal}
        selectedBook={selectedBook}
        deleteBook={deleteBook}
        handleNoBookPage={handleNoBookPage}
      />
      { listPerPage.length >= 2 &&
      (<Pagination
        changePage={setCurrentPage}
        countPage={listPerPage.length}
        currentPage={currentPage}
      />)
      }
    </>
  );
}

export default Table;