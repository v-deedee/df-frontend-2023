import './Main.css';
import ActionBar from './ActionBar/ActionBar';
import Table from './Table/Table';
import sampleData from '../../SampleData';
import { useState } from 'react';

function Main() {
  // Initialize book list
  const [books, setBooks] = useState(() => {
    let bookList;
    try {
      bookList = JSON.parse(localStorage.getItem('books'));
    } catch (error) {
      console.log("error");
    }
    if (bookList === null) {
      bookList = [...sampleData];
    }
    return {
      next_id: bookList.length === 0 ? 1 : bookList[bookList.length - 1].id + 1,
      list: bookList
    }
  });

  // Store search keyword
  const [key, setKey] = useState("");

  // Store current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Store status of 'No book' notification
  const [showNoti, setShowNoti] = useState(false);
  
  // Store book list for rendering in each page
  const [listPerPage, setListPerPage] = useState(() => {
    const temp = [];
    for (let i = 0; i < books.list.length; i = i + 5) {
      temp.push(books.list.slice(i, i + 5));
    }
    return temp;
  });

  // Update page when book list changes (when add, delete)
  function updatePage(newList) {
    const temp = [];
    for (let i = 0; i < newList.length; i = i + 5) {
      temp.push(newList.slice(i, i + 5));
    }
    setListPerPage(temp);
    if (temp.length === 0) {
      setShowNoti(true);
    } else {
      setShowNoti(false);
    }
  }

  // Add new book with book information (name, author, topic)
  function addBook(bookInfo) {
    const newBook = {
      id: books.next_id,
      ...bookInfo
    };
    setBooks(() => {
      const newList = [...books.list, newBook];

      updatePage(newList.filter(book => book.name.toLowerCase().includes(key.toLowerCase())));
      

      localStorage.setItem('books', JSON.stringify(newList));
      return ({
        next_id: books.next_id + 1,
        list: newList
      });
    });
  }

  // Delete book with given id
  function deleteBook(id) {
    setBooks(prev => {
      const newList = prev.list.filter(book => book.id !== id);

      updatePage(newList.filter(book => book.name.toLowerCase().includes(key.toLowerCase())));

      localStorage.setItem('books', JSON.stringify(newList));
      return ({
        next_id: prev.next_id,
        list: newList
      });
    })
  }

  // Filter book with keyword
  function filterBook(keyword) {
    if (keyword !== "") {
      const temp = books.list.filter(book => book.name.toLowerCase().includes(keyword.toLowerCase()));
      updatePage(temp);
      if (temp.length === 0) {
        setShowNoti(true);
      } else {
        setShowNoti(false);
      }
    } else {
      updatePage(books.list);
      setShowNoti(false);
    }
  }

  return (
    <main>
      <ActionBar
        addBook={addBook}
        filterBook={filterBook}
        setKey={setKey}
        setCurrentPage={setCurrentPage}
      />
      <Table
        listPerPage={listPerPage}
        deleteBook={deleteBook}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        showNoti={showNoti}
      />
    </main>
  );
}

export default Main;