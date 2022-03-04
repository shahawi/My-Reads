import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array,
  };

  state = {
    books: [],
    value: "",
    book: {},
    update: false,
    booksobj: {},
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books: books }));
    });
  }

  render() {
    return (
      <div>
        <ol className="books-grid">
          {this.props.books !== undefined &&
          this.props.books.constructor === Array &&
          this.props.books.length > 0 ? (
            this.props.books.map((book) => (
              <li key={book.id}>
                {book.imageLinks !== undefined && (
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          defaultValue={book.shelf}
                          onChange={(e) => this.props.handleChange(e, book)}
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {book.authors && book.authors.join(", ")}
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <div className="book" />
          )}
        </ol>
      </div>
    );
  }
}
export default BookList;
