import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Books from './Books'

class BookShelf extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        books: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        handleUpdate: PropTypes.func.isRequired
    }

    render() {
        const {name, books, handleUpdate} = this.props

        return (
            <div>
                {books && (
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{name}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.length > 0 && books.map((book, index) => (
                                    <Books
                                        key={index}
                                        book={book}
                                        changeBookShelf={handleUpdate}
                                    />
                                ))}
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BookShelf
