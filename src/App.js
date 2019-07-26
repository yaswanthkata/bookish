import React from "react";
import "./App.css";
// import {Route} from 'react-router-dom';
import BookListContainer from "./BookListContainer";

function App() {
  return (
    <div className="App">
      <h1>Bookish</h1>
      <BookListContainer />
    </div>
  );
}
export default App;
