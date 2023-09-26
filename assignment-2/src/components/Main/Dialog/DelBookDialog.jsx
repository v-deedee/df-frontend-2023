import { useEffect, useRef } from 'react';
import './Dialog.css';

function DelBookDialog({ isOpen, closeModal, selectedBook, deleteBook, handleNoBookPage }) {
  const modalRef = useRef(null);

  // Prevent closing modal on pressing "Enter"
  function preventClose(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  function handleCloseModal() {
    closeModal();
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleNoBookPage();
    deleteBook(selectedBook.id);
    closeModal();
  }

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  return  (
    <dialog ref={modalRef} id='delete-box' onKeyDown={preventClose}>
      <h2 className='dialog-title'>Delete book</h2>
      <form>
        <p className='dialog-content'>Do you want to delete <b>{selectedBook.name}</b> book?</p>
        <div className='button-group'>
          <button value='cancel' formMethod='dialog' className='custom-button' onClick={handleCloseModal}>Cancel</button>
          <button value='delete' type='submit' className='custom-button confirm-button' onClick={handleSubmit}>Delete</button>
        </div>
      </form>
    </dialog>
  );
}

export default DelBookDialog;