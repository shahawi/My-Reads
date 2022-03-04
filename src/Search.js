import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { withRouter } from "react-router-dom";
import BookList from "./BookList.js";

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
  }

  state = {
    querText: "",
    books: [],
    value: "",
  };

  // entered term is the letters entered in search bar concatenated
  enteredTerm = (querText) => {
    this.setState((prev) => ({
      querText: querText.trim() + prev.querText.trim,
    }));
  };

  // this function handles the search API
  searchBooks = (querText2) => {
    BooksAPI.search(querText2)
      .then((books) => {
        books.filter((b) => {
          for (let i of this.props.ownBooks) {
            if (i.title === b.title) {
              return (b.shelf = i.shelf);
            } else {
              b.shelf = "none";
            }
          }
          return b;
        });

        this.setState(() => ({
          books: books,
        }));
      })
      .catch((e) => {
        this.setState({ books: [] });
      });
  };

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books: books }));
    });
  }

  handleChange(e, book) {
    BooksAPI.update(book, e.target.value)
      .then(
        this.setState({
          value: this.state.value.concat("1"),
        })
      )
      .finally(
        this.props.history.push({ pathname: "/", state: this.state.books })
      );
  }

  //Only show books when there are letters matching
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.searchBooks(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="search-books-results" />

          <div className="bookshelf-books">
            <BookList
              books={this.state.books}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
