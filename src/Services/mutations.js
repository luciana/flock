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
};

export default Mutations;   