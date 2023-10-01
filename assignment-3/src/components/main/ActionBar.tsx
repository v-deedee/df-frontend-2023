import { useState } from 'react';
import AddBookModal from './modals/AddBookModal';

interface ActionBarProps {
  addBook: (info: { name: string; author: string; topic: string; }) => void,
  filterBook: (keyword: string) => void,
  setKey: React.Dispatch<React.SetStateAction<string>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  disabledSearch: boolean
}

const ActionBar: React.FC<ActionBarProps> = ({ addBook, filterBook, setKey, setCurrentPage, disabledSearch }) => {
  // Store status of modal
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    const keyword = event.currentTarget.value;
    filterBook(keyword);
    setKey(keyword);
  }

  return (
    <div id='action-bar'>
      <input type='search' placeholder='Search books' id='search-box' onChange={search} disabled={disabledSearch}/>
      <button className='custom-button' id='add-button' onClick={showModal}>Add book</button>
      <AddBookModal isOpen={modalOpen} closeModal={closeModal} addBook={addBook}/>
    </div>
  );
}

export default ActionBar;