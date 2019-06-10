import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo';
import { gql } from 'apollo-boost'

import BookList from './components/BookList';
import AddBook from './components/AddBook'

// setup apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1111/graphql'
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  )
}