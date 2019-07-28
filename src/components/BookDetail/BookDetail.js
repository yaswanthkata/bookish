import React from "react";

function BookDetail({ book }) {
  return (
    <div className="detail">
      <div className="name">{book.name}</div>
      <div className="description">{book.username ? book.username : book.name}</div>
    </div>
  );
}

export default BookDetail;
