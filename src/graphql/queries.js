/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      locale
      email
      name
      userTag
      birthdate
      votes {
        items {
          id
          userID
          optionID
          createdAt
          updatedAt
          owner
        }
        scannedCount
        count
        nextToken
      }
      online_ping
      last_seen_at
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        locale
        email
        name
        userTag
        birthdate
        votes {
          scannedCount
          count
          nextToken
        }
        online_ping
        last_seen_at
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      text
      user {
        id
        locale
        email
        name
        userTag
        birthdate
        votes {
          scannedCount
          count
          nextToken
        }
        online_ping
        last_seen_at
        createdAt
        updatedAt
        owner
      }
      voteEndedAt
      sentiment
      parentID
      questionTag
      options {
        items {
          id
          text
          questionID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $id: ID
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listQuestions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        text
        user {
          id
          locale
          email
          name
          userTag
          birthdate
          online_ping
          last_seen_at
          createdAt
          updatedAt
          owner
        }
        voteEndedAt
        sentiment
        parentID
        questionTag
        options {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOption = /* GraphQL */ `
  query GetOption($id: ID!) {
    getOption(id: $id) {
      id
      text
      votes {
        id
        userID
        optionID
        createdAt
        updatedAt
        owner
      }
      questionID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listOptions = /* GraphQL */ `
  query ListOptions(
    $id: ID
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOptions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        text
        votes {
          id
          userID
          optionID
          createdAt
          updatedAt
          owner
        }
        questionID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getVote = /* GraphQL */ `
  query GetVote($id: ID!) {
    getVote(id: $id) {
      id
      userID
      optionID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listVotes = /* GraphQL */ `
  query ListVotes(
    $id: ID
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVotes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        optionID
        createdAt
        updatedAt
        owner
      }
      scannedCount
      count
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        locale
        email
        name
        userTag
        birthdate
        votes {
          scannedCount
          count
          nextToken
        }
        online_ping
        last_seen_at
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getAllQuestions = /* GraphQL */ `
  query GetAllQuestions(
    $text: String!
    $sortDirection: ModelSortDirection
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getAllQuestions(
      text: $text
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        user {
          id
          locale
          email
          name
          userTag
          birthdate
          online_ping
          last_seen_at
          createdAt
          updatedAt
          owner
        }
        voteEndedAt
        sentiment
        parentID
        questionTag
        options {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const optionsByVotes = /* GraphQL */ `
  query OptionsByVotes(
    $text: String!
    $sortDirection: ModelSortDirection
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    optionsByVotes(
      text: $text
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        votes {
          id
          userID
          optionID
          createdAt
          updatedAt
          owner
        }
        questionID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
