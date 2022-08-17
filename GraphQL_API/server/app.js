const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
// this file will be ignored from the repo, but will contain the connection
// string for cloud.mongodb.com authentication
const mongoConf = require('./mongoConf');

const app = express();

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});

mongoose.connect(mongoConf)
  .catch(e => console.log(e));

mongoose.connection.once('open', () =>
  console.log('connected to database')
);
