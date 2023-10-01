import { useRef, useEffect, useState } from 'react';

interface AddModalProps {
  isOpen: boolean,
  closeModal: () => void,
  addBook: (info: { name: string, author: string, topic: string }) => void
}

const AddBookModal: React.FC<AddModalProps> = ({ isOpen, closeModal, addBook }) => {
  const [input, setInput] = useState({ name: '', author: '', topic: '' });

  const modalRef = useRef<HTMLDialogElement | null>(null);

  // Prevent closing modal on pressing 'Enter'
  const preventClose = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    closeModal();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    
    setInput(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (input.name === '') {
      alert('Please enter book name');
    } else if (input.author === '') {
      alert('Please enter author name');
    } else if(input.topic === '') {
      alert('Please enter book topic');
    } else {
      addBook(input);
      setInput({ name: '', author: '', topic: '' });
      closeModal();
    }
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

  return (
    <dialog ref={modalRef} id='add-box' onKeyDown={preventClose} role='presentation'>
      <h2 className='dialog-title'>Add book</h2>
      <form>
        <div className='input-box'>
          <label htmlFor='name-input'>
            Name
            <input id='name-input' name='name' placeholder='Enter book name' onChange={handleInputChange} value={input.name} />
          </label>
        </div>
        <div className='input-box'>
          <label htmlFor='author-input'>
            Author
            <input id='author-input' name='author' placeholder='Enter author name' onChange={handleInputChange} value={input.author} />
          </label>
        </div>
        <div className='input-box'>
          <label htmlFor='topic-input'>
            Topic
            <input id='topic-input' name='topic' placeholder='Enter book topic' onChange={handleInputChange} value={input.topic} />
          </label>
        </div>
        <div className='button-group'>
          <button value='cancel' className='custom-button' onClick={handleCloseModal}>Cancel</button>
          <button value='create' className='custom-button confirm-button' onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </dialog>
  );
}

export default AddBookModal;