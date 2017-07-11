import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from "./BookShelf";

class SearchBooks extends Component {
    state = {
        query: '',
        books: []
    }

    static propTypes = {
        handleUpdate: PropTypes.func.isRequired,
        books: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
    }

    updateQuery(query) {
        this.setState({query})
    }

    searchBooks(query) {
        if(query) {
            BooksAPI.search(query, 20).then((res) => {
                let receivedBooks = res
                if(receivedBooks.length > 1) {
                    receivedBooks.map((book) => {
                        this.props.books.map((oldBook) => {
                            if(book.id === oldBook.id) {
                                book.shelf = oldBook.shelf
                            }
                        })
                    })
                }
                if(this.refs.myRef) {
                    this.setState({ books: receivedBooks })
                }
            })
        }
    }

    render() {
        const {query, books} = this.state
        const {handleUpdate} = this.props

        this.searchBooks(query)

        let queryString = "Showing results for \""+query+"\"";

        return (
            <div className="search-books" ref="myRef">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {query && (
                        <BookShelf name={queryString} books={books} handleUpdate={handleUpdate}/>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchBooks
