import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }

    render() {
        const {book, changeBookShelf} = this.props

        return (
            <div>
                {book && (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''})`
                                }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(event) => changeBookShelf(event, book)}>
                                        <option value="" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">
                                {book.authors && book.authors.length > 0 && book.authors.map((author, index) => (
                                    <div key={index}>{author}</div>
                                ))}
                            </div>
                        </div>
                    </li>
                )}
            </div>
        )
    }
}

export default Books
