/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
export const onCreateOption = /* GraphQL */ `
  subscription OnCreateOption(
    $filter: ModelSubscriptionOptionFilterInput
    $owner: String
  ) {
    onCreateOption(filter: $filter, owner: $owner) {
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
export const onUpdateOption = /* GraphQL */ `
  subscription OnUpdateOption(
    $filter: ModelSubscriptionOptionFilterInput
    $owner: String
  ) {
    onUpdateOption(filter: $filter, owner: $owner) {
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
export const onDeleteOption = /* GraphQL */ `
  subscription OnDeleteOption(
    $filter: ModelSubscriptionOptionFilterInput
    $owner: String
  ) {
    onDeleteOption(filter: $filter, owner: $owner) {
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
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onCreateVote(filter: $filter, owner: $owner) {
      id
      userID
      optionID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onUpdateVote(filter: $filter, owner: $owner) {
      id
      userID
      optionID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onDeleteVote(filter: $filter, owner: $owner) {
      id
      userID
      optionID
      createdAt
      updatedAt
      owner
    }
  }
`;
