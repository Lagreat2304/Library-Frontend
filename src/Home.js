import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState({
        title: '',
        author: '',
        genre: '',
        id: ''
    });
    const [formData, setFormData] = useState({
        Book: '',
        Author: '',
        Genre: '',
        Count: ''
      });
      const [showOverlay, setShowOverlay] = useState(false);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/add', formData);
            alert('Product added successfully');
            fetchAllBooks();
            setFormData({
                Book: '',
                Author: '',
                Genre: '',
                Count: ''
            });
          } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred while adding the product');
          }
        };

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://library-backend-11ti.onrender.com/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFilteredBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://library-backend-11ti.onrender.com/filter', filterData);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching filtered books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterData({ ...filterData, [name]: value });
            setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        fetchFilteredBooks();
    };

    const resetFilter = () => {
        setFilterData({
            title: '',
            author: '',
            genre: '',
            id: ''
        });
        fetchAllBooks();
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="home-container">
            <button onClick={() => setShowOverlay(true)}>Add Books</button>
            {showOverlay && (
        <div className="overlay">
        <div className="overlay-content">
          <h3>Add Book</h3>
          <div>
            <label>
              Book Name:
              <input type="text" name="Book" value={formData.Book} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
              Author:
              <input type="text" name="Author" value={formData.Author} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
              Genre:
              <input type="text" name="Genre" value={formData.Genre} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
              Count:
              <input type="tel" name="Count" value={formData.Count} onChange={handleInputChange} required />
            </label>
            <br />
            <button type="submit" onClick={handleSubmit}>Add Books</button>
            <button onClick={() => setShowOverlay(false)}>Cancel</button>
          </div>
        </div>
        </div>
      )}
            <div className="filter-content">
                <h2>Filters</h2>
                <div className="filter-inputs">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={filterData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-inputs">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={filterData.author}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-inputs">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={filterData.genre}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-inputs">
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={filterData.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-buttons">
                    <button onClick={handleFilter}>Apply Filters</button>
                    <button onClick={resetFilter}>Reset</button>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <React.Fragment>
                    <table className="books-table">
                        <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Home;
