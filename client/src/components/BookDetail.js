import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'

const BOOK_DETAIL_QUERY = gql`
  query ($id: ID!){
    book(id: $id) {
      title
      genre
      author {
        name
        books {
          title
          id
        }
      }
    }
  }
`

export default function BookDetail({ id }) {
  return (
    <div>
      <h2>Book Details</h2>
    <Query query={BOOK_DETAIL_QUERY} variables={{ id }}>
      { ({ loading, data }) => {
        if (loading) return null
        if (data === undefined) return null
        const {
          title,
          genre,
          author: {
            name,
            books
          }
        } = data.book

        return (
          <div>
            <h3>{title}</h3>
            <p>{genre}</p>
            <p>{name}</p>
            <ul>
              {
                books.map(book => <li key={book.id}>{book.title}</li>)
              }
            </ul>
          </div>
        )
      }}
    </Query>
    </div>
  )
}