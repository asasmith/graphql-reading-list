import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'

import BookDetail from './BookDetail'

const BOOKS_QUERY = gql`
  {
    books {
      title
      id
    }
  }
`

export default class BookList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.setState({selected: e.target.dataset.id})
  }
  
  render() {
    const { selected } = this.state
    return (
      <div>
        <ul id='book-list'>
          <Query query={BOOKS_QUERY}>
            {({ loading, data}) => {
              if (loading) return 'loading...'
              const { books } = data
              return books.map(book => <li key={book.id} data-id={book.id} onClick={this.handleClick}>{book.title}</li>)
            }}
          </Query>
        </ul>
        <BookDetail id={selected} />
      </div>
    )
  }
}