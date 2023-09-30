import { useEffect, useRef } from 'react';

interface DelModalProps {
  isOpen: boolean,
  closeModal: () => void,
  selectedBook: { id: number, name: string },
  deleteBook: (id: number) => void,
  handleNoBookPage: () => void
}

const DelBookDialog : React.FC<DelModalProps> = ({ isOpen, closeModal, selectedBook, deleteBook, handleNoBookPage }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Prevent closing modal on pressing 'Enter'
  const preventClose = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
    }
  }

  const handleCloseModal = () => {
    closeModal();
  };

  const handleSubmit = () => {
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
    <dialog ref={modalRef} id='delete-box' onKeyDown={preventClose} role='presentation'>
      <h2 className='dialog-title'>Delete book</h2>
      <p className='dialog-content'>Do you want to delete <b>{selectedBook.name}</b> book?</p>
      <div className='button-group'>
        <button value='cancel' className='custom-button' onClick={handleCloseModal}>Cancel</button>
        <button value='delete' className='custom-button confirm-button' onClick={handleSubmit}>Delete</button>
      </div>
    </dialog>
  );
}

export default DelBookDialog;