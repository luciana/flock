import { useState, useEffect } from "react";
import Question from "./Question";
import QuestionService from '../../Services/QuestionService';
import { Loading }  from '../../Components';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";


const Questions = (
  user
) => {
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [votedList, setVotedList] = useState([]);
    const [votedOptionsList, setVoteOptionsdList] = useState([]);
  

    const [loading, setLoading] = useState(false);

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
    
      const handleVote = async (question, option) =>{                     
        try{
        
          setLoading(true);         
          let qOpt = JSON.parse(question.options);
          console.log("Options before", qOpt);
         // console.log("Question to be updated", question);
        //   {
        //     "id": "7998615d-88dd-427a-a20f-1a2851d009b3",
        //     "text": "my daughter love dolls.Should I buy American Doll or My Baby? #flocks American Doll, My Baby",
        //     "userID": "57cd07d8-b898-4e5c-904a-458ab4e8d8b8",
        //     "voteEndAt": "2023-01-30T01:13:29.953Z",
        //     "sentiment": "",
        //     "parentID": null,
        //     "questionTag": "#parents",
        //     "options": "[{\"votes\":0,\"id\":3942,\"text\":\"American Doll\",\"isComplete\":true},{\"votes\":0,\"id\":2604,\"text\":\"My Baby\",\"isComplete\":true}]",
        //     "createdAt": "2023-01-29T17:13:34.243Z",
        //     "updatedAt": "2023-01-29T17:13:34.243Z",
        //     "createdBy": "4555cc5e-191a-4bf2-8a29-e63b2fde117e"
        // }

        let optID = option.id;
        console.log("Option to be updated", option);

        if (qOpt && qOpt.length >0 ){
          if (optID){
            for (var i = 0, len = qOpt.length; i < len; i++) {
              console.log("looping array", qOpt[i]);
              if (qOpt[i].id === optID){
                console.log("updating vote");
                qOpt[i].votes = qOpt[i].votes++;
                
                break;
              }
            }
            console.log("Options after", qOpt);
          }
        }
      
         
        //   {
        //     "votes": 1,
        //     "id": 3942,
        //     "text": "American Doll",
        //     "isComplete": true
        // }

          let q = await Mutations.UpdateQuestionOptionsVote(
            question.id,
            JSON.stringify(qOpt)
          );
          const updatedBackendQuestions = backendQuestions.map((backendQuestion) => {
          if (backendQuestion.id === question.id) {
            return { ...backendQuestion, body: question };
          }
            return backendQuestion;
          });
          setBackendQuestions(updatedBackendQuestions);
          setActiveQuestion(null);
          console.log("Update vote for question");        
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