import { gql } from "@apollo/client";

// auth
export const CREATE_USER = gql`
  mutation Mutation($userName: String!) {
    createUser(userName: $userName) {
      _id
      userName
    }
  }
`;

export const GET_USER = gql`
  query ExampleQuery($userName: String!) {
    getUserByUserName(userName: $userName) {
      _id
      userName
    }
  }
`;

//notes
export const CREATE_NOTE = gql`
  mutation CreateNote(
    $userName: String!
    $title: String!
    $tagLine: String
    $body: String
    $pin: Boolean
  ) {
    createNote(
      userName: $userName
      title: $title
      tagLine: $tagLine
      body: $body
      pin: $pin
    ) {
      _id
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation CreateNote($id: ID!) {
    deleteNote(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_NOTE_PIN = gql`
  mutation UpdateNote($id: ID!, $pin: Boolean) {
    updateNote(_id: $id, pin: $pin) {
      _id
      pin
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote(
    $id: ID!
    $title: String
    $tagLine: String
    $body: String
    $pin: Boolean
  ) {
    updateNote(
      _id: $id
      title: $title
      tagLine: $tagLine
      body: $body
      pin: $pin
    ) {
      _id
      userName
      title
      tagLine
      body
      pin
    }
  }
`;

export const GET_NOTES = gql`
  query Query($userName: String!, $limit: Int, $offset: Int, $pin: Boolean) {
    getNotesByUserName(
      userName: $userName
      limit: $limit
      offset: $offset
      pin: $pin
    ) {
      _id
      userName
      title
      tagLine
      body
      pin
    }
  }
`;
