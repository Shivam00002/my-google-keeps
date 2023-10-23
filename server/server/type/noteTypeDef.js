const { gql } = require('graphql-tag');

const noteTypeDef = gql`
  type Note {
    _id: ID!
    userName: String
    title: String
    tagLine: String
    body: String
    pin: Boolean
  }

  type Query {
    getNotesByUserName(userName: String!, pin: Boolean, limit: Int, offset: Int): [Note]
  }

  type Mutation {
    createNote(
      userName: String!
      title: String!
      tagLine: String
      body: String
      pin: Boolean
    ): Note

    updateNote(
      _id: ID!
      title: String
      tagLine: String
      body: String
      pin: Boolean
    ): Note

    deleteNote(_id: ID!): Note
  }
`;

module.exports = noteTypeDef;
