const cors = require("cors");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const noteTypeDef = require("./server/type/noteTypeDef");
const noteResolver = require("./server/resolver/noteResolver");
const userTypeDefs = require("./server/type/userTypeDef");
const userResolvers = require("./server/resolver/userResolver");

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = new ApolloServer({
  typeDefs: [
  noteTypeDef,
  userTypeDefs
  ],
  resolvers: [
    noteResolver,
    userResolvers
  ],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: port },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});