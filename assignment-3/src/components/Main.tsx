import { useState } from 'react';
import ActionBar from './Main/ActionBar';
import Table from './Main/Table';
import { sampleData, BookInfo } from '../SampleData';

const Main = () => {
  // Initialize book list
  const [books, setBooks] = useState(() => {
    let bookList: Array<BookInfo> = [];
    try {
        const localData = localStorage.getItem('books');
        bookList = localData === null ? [...sampleData] : JSON.parse(localData);
    } catch (error) {
      console.error('error');
    }

    return {
      next_id: bookList.length === 0 ? 1 : bookList[bookList.length - 1].id + 1,
      list: bookList
    }
  });

  // Store search keyword
  const [key, setKey] = useState('');

  // Store current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Store status of 'No book' notification
  const [notiType, setNotiType] = useState('');
  
  // Store book list for rendering in each page
  const [listPerPage, setListPerPage] = useState(() => {
    const temp: Array<Array<BookInfo>> = [];
    for (let i = 0; i < books.list.length; i = i + 5) {
      temp.push(books.list.slice(i, i + 5));
    }
    return temp;
  });

  // Update page when book list changes (when add, delete)
  function updatePage(newList: Array<BookInfo>) {
    const temp: Array<Array<BookInfo>> = [];
    for (let i = 0; i < newList.length; i = i + 5) {
      temp.push(newList.slice(i, i + 5));
    }
    setListPerPage(temp);
    if (temp.length === 0) {
      setNotiType('search');
    } else {
      setNotiType('');
    }
  }

  // Add new book with book information (name, author, topic)
  const addBook = (info: { name: string, author: string, topic: string }) => {
    const newBook: BookInfo = {
      id: books.next_id,
      ...info
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
  const deleteBook = (id: number) => {
    setBooks(prev => {
      const newList = prev.list.filter(book => book.id !== id);

      updatePage(newList.filter(book => book.name.toLowerCase().includes(key.toLowerCase())));
      if (newList.length === 0) {
        setNotiType('no-data');
      }

      localStorage.setItem('books', JSON.stringify(newList));
      return ({
        next_id: prev.next_id,
        list: newList
      });
    })
  }

  // Filter book with keyword
  const filterBook = (keyword: string) => {
    if (keyword !== '') {
      const temp = books.list.filter(book => book.name.toLowerCase().includes(keyword.toLowerCase()));
      updatePage(temp);
      if (temp.length === 0) {
        setNotiType('search');
      } else {
        setNotiType('');
      }
    } else {
      updatePage(books.list);
      setNotiType('');
    }
  }

  return (
    <main>
      <ActionBar
        addBook={addBook}
        filterBook={filterBook}
        setKey={setKey}
        setCurrentPage={setCurrentPage}
        disabledSearch={books.list.length === 0}
      />
      <Table
        listPerPage={listPerPage}
        deleteBook={deleteBook}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        Noti={notiType}
      />
    </main>
  );
}

export default Main;