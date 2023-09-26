import { useRef, useEffect, useState } from 'react';
import './Dialog.css';

function AddBookDialog({ isOpen, closeModal, addBook }) {
  const [input, setInput] = useState({ name: '', author: '', topic: '' });

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

  function handleInputChange(event) {
    const { name, value } = event.target;
    
    setInput(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (input.name === '') {
      alert('Please enter book name');
    } else if (input.author === '') {
      alert('Please enter author name');
    } else if(input.topic === '') {
      alert('Please enter book topic');
    } else {
      console.log("dialog");
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
    <dialog ref={modalRef} id='add-box' onKeyDown={preventClose}>
      <h2 className='dialog-title'>Add book</h2>
      <form>
        <div className='input-box'>
          <label htmlFor='name-input'>Name</label>
          <input id='name-input' name='name' placeholder='Enter book name' onChange={handleInputChange} value={input.name} />
        </div>
        <div className='input-box'>
          <label htmlFor='author-input'>Author</label>
          <input id='author-input' name='author' placeholder='Enter author name' onChange={handleInputChange} value={input.author} />
        </div>
        <div className='input-box'>
          <label htmlFor='topic-input'>Topic</label>
          <input id='topic-input' name='topic' placeholder='Enter book topic' onChange={handleInputChange} value={input.topic} />
        </div>
        
        <div className='button-group'>
          <button value='cancel' formMethod='dialog' className='custom-button' onClick={handleCloseModal}>Cancel</button>
          <button value='create' type='submit' className='custom-button confirm-button' onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </dialog>
  );
}

export default AddBookDialog;