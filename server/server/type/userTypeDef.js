const { gql } = require('graphql-tag');

const userTypeDefs = gql`
  type User {
    _id: ID!
    userName: String!
  }

  type Query {
    getUserByUserName(userName: String!): User
  }

  type Mutation {
    createUser(userName: String!): User
    deleteUser(userId: ID!): User
  }
`;

module.exports = userTypeDefs;
