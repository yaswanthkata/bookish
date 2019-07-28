import React, { Component } from "react";
import axios from "axios";
import BooksList from "../components/BookList/BooksList";
import SearchBox from "../components/SearchBox/SearchBox";
class BookListContainer extends Component {
  constructor(props) {
    super(props);
    this.filterBook = this.filterBook.bind(this);
    this.state = {
      books: [],
      loading: true,
      error: null,
      term: ""
    };
  }
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => this.setState({ books: res.data, loading: false }))
      .catch(err => {
        this.setState({ loading: false, error: err });
      });
  }

  filterBook(e) {
    this.setState({
      term: e.target.value
    });

    axios
      .get(`https://jsonplaceholder.typicode.com/users?q=${e.target.value}`)
      .then(res => {
        this.setState({
          books: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
      });
  }
  render() {
    return (
      <div>
        <SearchBox term={this.state.term} onChange={this.filterBook} />
        <BooksList {...this.state} />
      </div>
    );
  }
}

export default BookListContainer;
