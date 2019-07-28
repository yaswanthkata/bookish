import React from "react";

const BooksList = ({ books, loading, error }) => {
  if (loading) {
    return <div className="loading" />;
  }
  if (error) {
    return <div className="error" />;
  }
  return (
    <div className="books-list">
      {books.map(book => (
        <div className="book" key={book.id}>
          <h2 className="title">{book.name}</h2>
          <a href={`/books/${book.id}`} className="view-detail">
            View Detail
          </a>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
