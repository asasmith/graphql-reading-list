const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://asa-admin:talss1980Asa@graphqldemo-e6fkb.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('connected to mongodb'))

const app = express()
const PORT = 1111

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})