import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

const CreateUser = async (email, locale) => {
  const {
    data: { createUser },
  } = await API.graphql(
    graphqlOperation(mutations.createUser, { input: { email, locale } })
  );
  return createUser;
};

const UpdateUser = async ({ id, email, locale }) => {
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id, email, locale },
    })
  );
  return updateUser;
};


const UpdateUserVotes = async ( id, votes ) => {
  //votes = [{\"optionId\":3942,\"questionId\":\"7998615d-88dd-427a-a20f-1a2851d009b3\"}]
  console.log("UpdateUserVotes mutation input", id, votes);
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id,votes },
    })
  );
  return updateUser;
};

// updateQuestion(input: {id: "b35d6d5e-4160-40d2-951d-6444d7fe90a2"
//   options:"[{\"votes\":1,\"id\":1,\"text\":\"reactjs\"},{\"votes\":0,\"id\":2,\"text\":\"vuejs\"}]"})
const UpdateQuestionOptions = async ( id, options ) => { 
  const {
    data: { updateQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.updateQuestion, {
      input: { id, options },
    })
  );
  return updateQuestion;
};

const CreateQuestion = async (
    text, 
    userID,
    voteEndAt,
    sentiment,
    parentID,
    questionTag,
    options,
    ) => {
  const {
    data: { createQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.createQuestion, { input: 
      {  text, 
        userID,
        voteEndAt,
        sentiment,
        parentID,
        questionTag,
        options
      } })
  );
  return createQuestion;

}

const Mutations = {
  CreateUser,
  UpdateUser,
  CreateQuestion,
  UpdateQuestionOptions,
  UpdateUserVotes,
};

export default Mutations;   