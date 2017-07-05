import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Header from './Header'
import BookShelf from './BookShelf'

class App extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            let currentlyReading = books.filter(book => book.shelf === "currentlyReading")
            let wantToRead = books.filter(book => book.shelf === "wantToRead")
            let read = books.filter(book => book.shelf === "read")
            this.setState({ currentlyReading, wantToRead, read })
        })
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.state
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <Header/>
                        <div className="list-books-content">
                            <div>
                                <BookShelf name="Currently Reading" books={currentlyReading}/>
                                <BookShelf name="Want To Read" books={wantToRead}/>
                                <BookShelf name="Read" books={read}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
                <Route path="/search" render={() => (
                    <SearchBooks/>
                )}/>
            </div>
        )
    }
}

export default App
