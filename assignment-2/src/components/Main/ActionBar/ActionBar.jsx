import './ActionBar.css';
import AddBookDialog from '../Dialog/AddBookDialog';
import { useState } from 'react';

function ActionBar({ addBook, filterBook, setKey, setCurrentPage }) {
  // Store status of modal
  const [modalOpen, setModalOpen] = useState(false);

  function showModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function search(event) {
    setCurrentPage(1);
    const keyword = event.target.value;
    filterBook(keyword);
    setKey(keyword);
  }

  return (
    <div id='action-bar'>
      <input type='search' placeholder='Search books' id='search-box' onChange={search}></input>
      <button className='custom-button' id='add-button' onClick={showModal}>Add book</button>
      <AddBookDialog isOpen={modalOpen} closeModal={closeModal} addBook={addBook}/>
    </div>
  );
}

export default ActionBar;