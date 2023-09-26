import './Table.css';
import DelBookDialog from '../Dialog/DelBookDialog';
import Pagination from './Pagination/Pagination';
import Notification from '../Noti/Notification';
import { useState } from 'react';

function Table({ listPerPage, deleteBook, currentPage, setCurrentPage, showNoti }) {
  // Store selected book for deleting
  const [selectedBook, setSelectedBook] = useState({
    id: -1,
    name: 'test'
  });

  // Store status of modal
  const [modalOpen, setModalOpen] = useState(false);

  // Prevent error when page is empty after delete
  function handleNoBookPage() {
    if (listPerPage[listPerPage.length - 1].length === 1
      && listPerPage[listPerPage.length - 1][0].id === selectedBook.id) {
      setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
    }
  }

  function showModal(id, name) {
    setSelectedBook({
      id: id,
      name: name
    });
    setModalOpen(true);
  }

  function closeModal() {
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
      { showNoti && <Notification />}
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