
import QuestionAndPoll2 from '../../Components/Questions/QuestionAndPoll2';
import { useEffect, useState, useContext } from "react";
import { LANGUAGES, ROUTES } from "../../Constants";
import { AppContext } from "../../Contexts";
import { Alert, Title } from "../../Components";


const NewQuestion = (props) => {
  const { state } = useContext(AppContext);
  const { user } = state;
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState();

  useEffect(() => {
    user && setEmail(user?.email);
  }, [user]);


return (
  
  <div className="container grid sm:grid-cols-3 gap-2">  
      <Title
      text={LANGUAGES[user.locale].Questions.NewQuestionTitle}
      back={ROUTES[user.locale].MAIN}
    />
      <Alert type={alert?.type} text={alert?.text} />
                                               
        <div id="question-form">
          <QuestionAndPoll2 user={user}  />
        </div> 
    </div>
  )
};

export default NewQuestion;