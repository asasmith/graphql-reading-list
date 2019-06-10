const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
const PORT = 1111

app.use(cors())

mongoose.connect(`mongodb+srv://asa-admin:talss1980Asa@graphqldemo-e6fkb.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('connected to mongodb'))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})