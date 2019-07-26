import React from "react";

const BooksList = ({ books, loading ,error}) => {
  if (loading) {
    return <div className="loading" />;
  }
  if (error) {
    return <div className="error" />;
  }
  return (
    <div className="books-list">
      {books &&
        books.map(book => (
          <div className="book" key={book.name}>
            <h2 className="title">{book.name}</h2>
          </div>
        ))}
    </div>
  );
};

export default BooksList;
