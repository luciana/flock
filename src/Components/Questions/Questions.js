import { useState, useEffect } from "react";
import Question from "./Question";
import QuestionService from '../../Services/QuestionService';
import { Loading }  from '../../Components';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";


const Questions = (
  state
) => {
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [votedList, setVotedList] = useState([]);
    const [votedOptionsList, setVoteOptionsdList] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("USER in Questions.js", state.user);
    const user = state.user;

    const loadQuestions = async () => {
      try{
        setLoading(true);
        let q = await Queries.GetAllQuestions();
        console.log("Get all Questions from db", q);
        setBackendQuestions(q);
        console.log("setBackendQuestions", backendQuestions);
        setLoading(false);
      }catch(err){
        console.error("Loading Questions from queries error", err);
        setBackendQuestions([]);
      }

    };

    useEffect(() => {
        loadQuestions();
        if(user.votes) {
          let votes = JSON.parse(user.votes);
          setVotedList(votes);
          const newArray = [];            
          for (let i = 0; i < votes.length; i++) {
            newArray.push(votes[i].optionId);
          }
          setVoteOptionsdList(newArray);
        };               
      }, []);

      const rootQuestions = backendQuestions.filter(
        (backendQuestion) => ((backendQuestion.parentID === null) )
        ).sort(
          (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )

      const addQuestion = (text) => {
        console.log('addQuestion triggered from question and poll - not calling graphql mutation', text);
        QuestionService.createQuestion(text).then((question) => {         
          setBackendQuestions([question.text, ...backendQuestions]);
          setActiveQuestion(null);
        });
    };

      const getReplies = (questionId) =>{       
        return backendQuestions
        .filter((backendQuestion) => backendQuestion.parentId === questionId)
        .sort(
            (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );}

   
    
      const updateQuestion = (text, questionId) => {
        console.log("updateQuestion triggered", QuestionService.updateQuestion(text, questionId));
        QuestionService.updateQuestion(text, questionId).then((data) => {
            const updatedBackendQuestions = backendQuestions.map((backendQuestion) => {
            if (backendQuestion.id === questionId) {
              return { ...backendQuestion, body: text };
            }
            return backendQuestion;
          });
          setBackendQuestions(updatedBackendQuestions);
          setActiveQuestion(null);
        });
      };
      const deleteQuestion = (questionId) => {
        if (window.confirm("Are you sure you want to remove question?")) {
            QuestionService.deleteQuestion.then(() => {
            const updatedBackendQuestions = backendQuestions.filter(
              (backendQuestion) => backendQuestion.id !== questionId
            );
            setBackendQuestions(updatedBackendQuestions);
          });
        }
      };
    
      const handleVote = async (question, option, userVote) =>{                     
        try{
        
          setLoading(true);         
          let optionsInQuestion = JSON.parse(question.options);
          let userVotes = [];
          if (user.votes) userVotes = JSON.parse(user.votes);
          userVotes.push(userVote);

          let optID = option.id;
          // console.log("Option to be updated", option);
//user.votes = "[{\"optionId\":3942,\"questionId\":\"7998615d-88dd-427a-a20f-1a2851d009b3\"}]"
      //question.options = [{\"votes\":0,\"id\":3293,\"text\":\"cancun\",\"isComplete\":true},{\"votes\":0,\"id\":9623,\"text\":\"punta cana?\",\"isComplete\":true}]
      
    

        if (optionsInQuestion && optionsInQuestion.length >0 ){
          if (optID){
            for (var i = 0, len = optionsInQuestion.length; i < len; i++) {
              console.log("looping array", optionsInQuestion[i]);
              if (optionsInQuestion[i].id === optID){
                optionsInQuestion[i] = option;      
                break;
              }
            }
            console.log("Options after", optionsInQuestion);
          }
        }

        console.log("input", question.id,JSON.stringify(optionsInQuestion));
          let q = await Mutations.UpdateQuestionOptions(
            question.id,
            JSON.stringify(optionsInQuestion)
          );

          console.log("user id for update user votes mutation ", user.id, JSON.stringify(userVotes));
          let u = await Mutations.UpdateUserVotes(
            user.id,
            JSON.stringify(userVotes)
          );
      
          updateVotedOptionsList(optID);
         
        }catch(err){
          console.error("Error on Mutations.UpdateQuestion ", err);
        }      
      }

      const updateVotedList = (item) => {    
        setVotedList(votedList => {           
          const newArray = [...votedList];
          newArray.push(item);
          return newArray;
        });        
      }
      const updateVotedOptionsList = (id) => {    
        setVotedList(votedOptionsList => {           
          const newArray = [...votedOptionsList];
          newArray.push(id);
          return newArray;
        });        
      }


      console.log("root questions", rootQuestions);

      return ( 
        <>
            {loading && <Loading />}
            {votedList.length > 0 && (
                <div className="container border border-2 p-0 d-flex flex-colum">
                  <span className="text-small">You helped {votedList.length} decision{votedList.length > 1 ? 's' :''} be made.</span>
                </div>
            )}
        
            <div id="all-questions" className=" container border border-2 p-0 d-flex flex-column">
                {rootQuestions.map((rootQuestion) => (
                    <Question 
                        key={rootQuestion.id}
                        question={rootQuestion}
                        replies={getReplies(rootQuestion.id)}                        
                        setActiveQuestion={setActiveQuestion}
                        handleVote={handleVote}
                        updateVotedList={updateVotedList}
                        updateVotedOptionsList={updateVotedOptionsList}
                        votedList={votedList}
                        votedOptionsList={votedOptionsList}
                        addQuestion={addQuestion}
                        activeQuestion={activeQuestion}                       
                        deleteQuestion={deleteQuestion}
                        updateQuestion={updateQuestion}                        
                        user={user}
                    />
                ))}
            </div>
        </>
      );
};

export default Questions;