import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'

const AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`

const BOOKS_QUERY = gql`
  {
    books {
      title
      id
    }
  }
`

const ADDBOOK_MUTATION = gql`
  mutation ($title: String!, $genre: String!, $authorId: ID!){
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      title
      id
    }
  }
`

export default class AddBook extends Component{
  constructor(props) {
    super(props) 
    this.state = {
      title: '',
      genre: '',
      authorId: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const {
      target,
      target: { name },
    } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(
      {
        [name]: value,
      },
    );
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    const { title, genre, authorId} = this.state
    return (
      <Mutation
        mutation={ADDBOOK_MUTATION}
        variables={{
          title,
          genre,
          authorId,
        }}
        refetchQueries={() => {
          return [
            {
              query: BOOKS_QUERY,
            }
          ]
        }}
      >
        { addBook => (
          <form 
            onSubmit={e => {
              e.preventDefault()
              addBook().then(() => {
                console.log('got here')
                this.setState({
                  title: '',
                  genre: '',
                  authorId: '',
                })
              }).catch(e => console.log(e))
          }}>
            <fieldset id='book-title'>
              <label>Title:</label>
              <input type="text" name='title' onChange={this.handleInputChange} value={title}/>
            </fieldset>
            <fieldset>
              <label>Genre:</label>
              <input type="text" name='genre' onChange={this.handleInputChange} value={genre}/>
            </fieldset>
            <fieldset>
              <label>Author:</label>
              <select name='authorId' onChange={this.handleInputChange} value={authorId}>
                <option value=''>select author</option>
                <Query query={AUTHORS_QUERY}>
                  {({loading, data}) => {
                    if (loading) return ''
                    const { authors } = data
                    return authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
                  }}
                </Query>
              </select>
            </fieldset>
            <button>add book</button>
          </form>
        )}
      </Mutation>
    )
  }
}
