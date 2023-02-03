import { useState, useEffect, useContext } from "react";
import Question from "./Question";
import QuestionService from '../../Services/QuestionService';
import { Loading, Alert }  from '../../Components';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import { AppContext} from '../../Contexts'; 


const Questions = (
  
) => {
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [votedList, setVotedList] = useState([]);
    const [votedOptionsList, setVoteOptionsdList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { state } = useContext(AppContext);
    const { user } = state;
    console.log("USER in Questions.js state", state);  

    useEffect(() => {

      const loadQuestions = async () => {
        try{
          setLoading(true);       
          let q = await Queries.GetAllQuestions();
          console.log("Get all Questions from db", q);
          setBackendQuestions(q);
         
          setLoading(false);
        }catch(err){
          console.error("Questions.js Loading Questions from queries error", err);
          setBackendQuestions([]);
          setLoading(false);
        }
      };
    
      const loadVotes = async () => {
        try{
          if(user.votes) {
            let votes = JSON.parse(user.votes);
            setVotedList(votes);
            const newArray = [];            
            for (let i = 0; i < votes.length; i++) {
              newArray.push(votes[i].optionId);
            }
            setVoteOptionsdList(newArray);
          }; 
        }catch(err){
          console.error("Questions.js Loading Votes from queries error", err);
          setBackendQuestions([]);
          setLoading(false);
        }
      };


        loadQuestions();
        loadVotes();
        
                      
      }, []);

      const rootQuestions = backendQuestions.filter(
        (backendQuestion) => ((backendQuestion.parentID === null) )
        ).sort(
          (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

   
    
      const updateQuestion = async (question, option) => {
       
        if(! question.options) return; //TODO: alert
        let optionsInQuestion = JSON.parse(question.options);
        let optID = option.id;
         
       //question.options = [{\"votes\":0,\"id\":3293,\"text\":\"cancun\",\"isComplete\":true},{\"votes\":0,\"id\":9623,\"text\":\"punta cana?\",\"isComplete\":true}]
      
    
        try{        
          if (optionsInQuestion && optionsInQuestion.length >0 ){
            if (optID){
              for (var i = 0, len = optionsInQuestion.length; i < len; i++) {               
                if (optionsInQuestion[i].id === optID){
                  optionsInQuestion[i] = option;      
                  break;
                }
              }
              console.log("Options after", optionsInQuestion);
            }
          }

        console.log("Mutations.UpdateQuestionOptions inputs", question.id,JSON.stringify(optionsInQuestion));
          let q = await Mutations.UpdateQuestionOptions(
            question.id,
            JSON.stringify(optionsInQuestion)
          );
          console.log("Mutations.UpdateQuestionOptions result", q);
          updateVotedOptionsList(optID);
         
        }catch(err){
          console.error("Mutations.UpdateQuestion error", err);
        } 

        // console.log("updateQuestion triggered", QuestionService.updateQuestion(text, questionId));
        // QuestionService.updateQuestion(text, questionId).then((data) => {
        //     const updatedBackendQuestions = backendQuestions.map((backendQuestion) => {
        //     if (backendQuestion.id === questionId) {
        //       return { ...backendQuestion, body: text };
        //     }
        //     return backendQuestion;
        //   });
        //   setBackendQuestions(updatedBackendQuestions);
        //   setActiveQuestion(null);
        // });
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
      const updateUserVotes = async (userVote) =>{   
        try{                
          let userVotes = [];
          if (user.votes) userVotes = JSON.parse(user.votes);
          userVotes.push(userVote);
          //user.votes = "[{\"optionId\":3942,\"questionId\":\"7998615d-88dd-427a-a20f-1a2851d009b3\"}]"


          console.log("Mutations.UpdateUserVotes inputs ", user.id, JSON.stringify(userVotes));
          let u = await Mutations.UpdateUserVotes(
            user.id,
            JSON.stringify(userVotes)
          );
      
          console.log("Mutations.UpdateUserVotes result", u);
         
        }catch(err){
          console.error("Mutations.UpdateUserVotes Error ", err);
        }      
      }

      const handleVote = async (question, option, userVote) =>{                     
        try{
        
        console.log("Questions.js Handle Vote updateUserVotes input", userVote);
         setLoading(true);         
         updateQuestion(question, option);
         updateUserVotes(userVote);
         setLoading(false);     
         
        }catch(err){
          console.error("Error on handleVote ", err);
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


      console.log("backendQuestion", backendQuestions);
      console.log("root questions", rootQuestions);

      return ( 
        <>
            {loading && <Loading />}
            {( rootQuestions.length === 0 ) && <Alert type="warning" text="No questions retrieved. Start one!" link="/NewQuestion" />}
            {votedList.length > 0 && (
                <div className="container border border-0 p-0 d-flex flex-colum">
                  <span className="text-small">You helped {votedList.length} decision{votedList.length > 1 ? 's' :''} be made.</span>
                </div>
            )}
        
            <div id="all-questions" className=" container border border-0 p-0 d-flex flex-column">
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