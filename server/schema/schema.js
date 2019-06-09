const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID, 
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')

const Book = require('../models/book')
const Author = require('../models/author')

// placeholder data
// const books = [
//   {
//     id: '1',
//     name: '1984',
//     genre: 'Dystopian Fiction',
//     authid: '1',
//   },
//   {
//     id: '2',
//     name: 'The Hobbit',
//     genre: 'Fantasy',
//     authid: '2',
//   },
//   {
//     id: '3',
//     name: 'Harry Potter and the Prisoner of Azkaban',
//     genre: 'Fantasy',
//     authid: '3',
//   },
//   {
//     id: '4',
//     name: 'Animal Farm',
//     genre: 'Dystopian Fiction',
//     authid: '1'
//   },
//   {
//     id: '5',
//     name: 'Harry Potter and the Half Blood Prince',
//     genre: 'Fantasy',
//     authid: '3'
//   },
//   {
//     id: '6',
//     name: 'Harry Potter and the Order of the Phoenix',
//     genre: 'Fantasy',
//     authid: '3'
//   },
// ]


// const authors = [
//   {
//     id: '1',
//     name: 'George Orwell',
//     age: 46,
//   },
//   {
//     id: '2',
//     name: 'J.R.R. Tolkien',
//     age: 81,
//   },
//   {
//     id: '3',
//     name: 'J.K. Rowling',
//     age: 53,
//   }
// ]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return the author for each book
        return Author.findById(parent.authorId)
      }
    } 
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return array of books by author
        return Book.find({ authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return single book from db
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return single author from db
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return all books from db
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return all authors from db
        return Author.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          title: args.title,
          genre: args.genre,
          authorId: args.authorId,
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})