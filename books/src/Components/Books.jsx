import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar.jsx';
import '../App.css';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    axios
      .get(`https://reactnd-books-api.udacity.com/books`, {
        headers: { Authorization: 'whatever-you-want' },
      })
      .then((res) => {
        if (res.data.books.error === 'empty query') {
          setAllBooks([]);
          console.log('No data');
        } else {
          setAllBooks(res.data.books);
          setSearchResults(res.data.books); 
        }
      })
      .catch((err) => {
        console.error('An error occurred:', err);
        setAllBooks([]);
        setSearchResults([]);
      });
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === '') {
      setSearchResults(allBooks);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchInput !== '') {
      const filteredBooks = allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredBooks);
    }
  };

  return (
    <>
      <NavBar />
      <div className="search-container">
        <input
          id='input'
          type="text"
          placeholder="Search books..."
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleSearch}
          className="search-input"
        />

        {searchResults.length === 0 && searchInput !== '' && <p>No results found</p>}

        {searchResults.length > 0 && (
          <div>
            <h1>Search Results:</h1>
            <ul>
              {searchResults.map((book) => (
                <li key={book.id}>
                  <img
                    src={book.imageLinks?.thumbnail || 'placeholder-url-if-not-available'}
                    alt={book.title}
                    style={{ maxWidth: '100px', maxHeight: '150px' }}
                  />
                  <p>{book.title}</p>
                  <p>Free</p>
                  <p>Rating: {book.averageRating || 'N/A'}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
