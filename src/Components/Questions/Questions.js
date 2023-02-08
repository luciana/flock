import { useState, useEffect, useContext } from "react";
import Question from "./Question";
import QuestionService from '../../Services/QuestionService';
import { Loading, Alert, Switch }  from '../../Components';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import { AppContext} from '../../Contexts'; 
import { ROUTES, TYPES } from "../../Constants";


const Questions = () => {
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [votedList, setVotedList] = useState([]);
    const [votedOptionsList, setVoteOptionsdList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [voteFileChecked, setVoteFileChecked] = useState(false);  
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const [filterList, setFilterList]= useState([]);
   // console.log("USER in Questions.js state", state);  

    useEffect(() => {

      const loadQuestions = async () => {
        try{
          setLoading(true);       
          let q = await Queries.GetAllQuestions();
          //console.log("Get all Questions from db", q);
          setBackendQuestions(q);
          setFilterList(q.filter(
            (backendQuestion) => ((backendQuestion.parentID === null) )
          ).sort(
            (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ))
          console.log("load filter list question", filterList);
          setLoading(false);
        }catch(err){
          console.error("Questions.js Loading Questions from queries error", err);
        
          setBackendQuestions([]);
          setLoading(false);
          alert("Error getting all the questions from database");
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
          alert("Error getting question voltes from database");
        }
      };


        loadQuestions();
        loadVotes();
        
                      
      }, [user]);

     
      // const rootQuestions =  backendQuestions.filter(
      //   (backendQuestion) => ((backendQuestion.parentID === null) )
      // ).sort(
      //   (a, b) =>
      //   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      // ); 

        const handleVoteFilterSwitch = () => {     
          setVoteFileChecked(!voteFileChecked);      
          if (!voteFileChecked){        
            const filteredList = backendQuestions.filter(
              (backendQuestion) => (((new Date(backendQuestion.voteEndAt) - new Date() > 1 ) 
                            && (backendQuestion.parentID === null)) )
              ).sort(
                (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
              console.log("filteredList true", filteredList);
              console.log("compare question date ", new Date(backendQuestions[3].voteEndAt));
              console.log("new Date(backendQuestion.voteEndAt) - new Date()", new Date(backendQuestions[3].voteEndAt) - new Date());
              setFilterList(filteredList);
          }else{
            
            console.log("filteredList false", backendQuestions);
            setFilterList(backendQuestions);
          }      
         
        }; 
                
    

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

          let q = await Mutations.UpdateQuestionOptions(
            question.id,
            JSON.stringify(optionsInQuestion)
          );

          const newA = [];  
          newA.push(q);          
          const updatedBackendQuestions =  backendQuestions.map(obj => newA.find(o => o.id === obj.id) || obj);
          console.log("Questions.js updatedBackendQuestions result", updatedBackendQuestions);        
          setBackendQuestions(updatedBackendQuestions);
          setActiveQuestion(null);             
        }catch(err){
          console.error("Mutations.UpdateQuestion error", err);
        } 
      };

      const deleteQuestion = async (id) => {
        if (window.confirm("Are you sure you want to remove question?")) {
          try{
        
            console.log("Questions.js Delete Question input ", id);
            setLoading(true);  
            let deletedQuestion = await Mutations.DeleteQuestion(
              id             
            );

            const updatedBackendQuestions = backendQuestions.filter(
                  (backendQuestion) => backendQuestion.id !== id
                );
            setBackendQuestions(updatedBackendQuestions);
            setLoading(false);  

          } catch (err){
            setLoading(false); 
            console.error("Error on deleteQuestion ", err);
          }        
        }
      };
      const updateUserVotes = async (userVote) =>{        
        try{                
          let userVotes = [];
          if (user.votes) userVotes = JSON.parse(user.votes);
          userVotes.push(userVote);
          //user.votes = "[{\"optionId\":3942,\"questionId\":\"7998615d-88dd-427a-a20f-1a2851d009b3\"}]"


          console.log("Mutations.UpdateUserVotes inputs ", user.id, JSON.stringify(userVotes));
          let userVotesUpdated = await Mutations.UpdateUserVotes(
            user.id,
            JSON.stringify(userVotes)
          );
      
          console.log("Mutations.UpdateUserVotes result", userVotesUpdated);
         
          dispatch({ type: TYPES.UPDATE_USER, payload: userVotesUpdated });
         
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
      
      const showNoQuestions = filterList.length === 0;
      console.log("Switch", voteFileChecked);
      console.log("backendQuestion", backendQuestions);
      console.log("filterList questions", filterList);

      return ( 
        <>
            {loading && <Loading />}
            {( !loading && showNoQuestions ) && <Alert type="warning" text="No questions retrieved. Start one!" link={ROUTES[state.lang].NEW_QUESTION} />}          
            <Switch label={"Only open questions"}
                    handleSwitch={handleVoteFilterSwitch}/>           
              <div id="all-questions" className=" border border-0 p-0 ">
                  {filterList.map((rootQuestion) => (
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