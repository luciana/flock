/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createOption = /* GraphQL */ `
  mutation CreateOption(
    $input: CreateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    createOption(input: $input, condition: $condition) {
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
export const updateOption = /* GraphQL */ `
  mutation UpdateOption(
    $input: UpdateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    updateOption(input: $input, condition: $condition) {
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
export const deleteOption = /* GraphQL */ `
  mutation DeleteOption(
    $input: DeleteOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    deleteOption(input: $input, condition: $condition) {
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
export const createVote = /* GraphQL */ `
  mutation CreateVote(
    $input: CreateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    createVote(input: $input, condition: $condition) {
      id
      userID
      optionID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateVote = /* GraphQL */ `
  mutation UpdateVote(
    $input: UpdateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    updateVote(input: $input, condition: $condition) {
      id
      userID
      optionID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteVote = /* GraphQL */ `
  mutation DeleteVote(
    $input: DeleteVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    deleteVote(input: $input, condition: $condition) {
      id
      userID
      optionID
      createdAt
      updatedAt
      owner
    }
  }
`;
