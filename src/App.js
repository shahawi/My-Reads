import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList.js";
import Search from "./Search";
import "./App.css";

class BooksApp extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
  }

  state = {
    books: [],
    value: "",
    book: {},
    booksObj: {},
  };

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  //When component mounts populate books array
  componentDidMount() {
    this.getAllBooks();
  }

  componentDidUpdate() {
    this.getAllBooks();
  }
  // a function that handle changes to book shelves
  handleChange(e, book) {
    BooksAPI.update(book, e.target.value)
      .then(this.setState({ value: this.state.value.concat("1") }))
      .finally(this.getAllBooks());
  }

  //Using routes to navigate within apps
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div className="app">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <BookList
                          books={this.state.books.filter(
                            (book) => book.shelf === "currentlyReading"
                          )}
                          handleChange={this.handleChange}
                        />
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                          <BookList
                            books={this.state.books.filter(
                              (book) => book.shelf === "wantToRead"
                            )}
                            handleChange={this.handleChange}
                          />
                        </div>
                        <div className="bookshelf">
                          <h2 className="bookshelf-title">Read</h2>
                          <div className="bookshelf-books">
                            <BookList
                              books={this.state.books.filter(
                                (book) => book.shelf === "read"
                              )}
                              handleChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Link className="open-search" to="/search">
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => <Search ownBooks={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;
