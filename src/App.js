import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import {Route, Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Header from './Header'
import BookShelf from './BookShelf'

class App extends React.Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
            this.updateShelves();
        })
    }

    updateShelves() {
        const {books} = this.state
        let currentlyReading = books.filter(book => book.shelf === "currentlyReading")
        let wantToRead = books.filter(book => book.shelf === "wantToRead")
        let read = books.filter(book => book.shelf === "read")
        this.setState({currentlyReading, wantToRead, read})
    }

    changeShelf = (event, book) => {
        let books = this.state.books
        let newBook = true

        books.map(b => {
            if (b.id === book.id) {
                newBook = false
            }
        })

        if (newBook) {
            books.push(book)
        }

        books.forEach((b) => {
            if (b.id === book.id) {
                b.shelf = event.target.value
            }
        })

        this.setState({books})
        this.updateShelves()
        BooksAPI.update(book, event.target.value)
    }

    render() {
        const {currentlyReading, wantToRead, read, books} = this.state

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <Header/>
                        <div className="list-books-content">
                            <div>
                                <BookShelf name="Currently Reading" books={currentlyReading}
                                           handleUpdate={this.changeShelf}/>
                                <BookShelf name="Want To Read" books={wantToRead} handleUpdate={this.changeShelf}/>
                                <BookShelf name="Read" books={read} handleUpdate={this.changeShelf}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
                <Route path="/search" render={() => (
                    <SearchBooks handleUpdate={this.changeShelf} books={books}/>
                )}/>
            </div>
        )
    }
}

export default App
