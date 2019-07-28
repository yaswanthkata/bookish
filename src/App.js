import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import BookListContainer from "./containers/BookListContainer";
import BookDetailContainer from "./containers/BookDetailContainer";
import test from "./test";

function App() {
  return (
    <div className="App">
      <h1>Bookish</h1>
      <main>
        <Route exact path="/" component={BookListContainer} />
        <Route path="/test" component={test} />
        <Route path="/books/:id" component={BookDetailContainer} />
      </main>
    </div>
  );
}
export default App;
