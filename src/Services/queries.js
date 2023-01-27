import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

const GetUserByEmail = async (email) => {
  const data = await API.graphql(graphqlOperation(queries.userByEmail, { email }));

  return data.data.userByEmail.items.length ? data.data.userByEmail.items[0] : null;
};

const GetAllQuestions = async() => {

  const data = await API.graphql(graphqlOperation(queries.listQuestions));

  return data.data.listQuestions.items.length ? data.data.listQuestions.items : null;
}

const Queries = {
  GetUserByEmail,
  GetAllQuestions,
};




export default Queries;