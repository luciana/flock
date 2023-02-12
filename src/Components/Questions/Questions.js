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
    const [isVoteFilterChecked, setIsVoteFilterChecked] = useState(false);  
    const [isQuestionFilterChecked, setIsQuestionFilterChecked] = useState(false);     
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
          setBackendQuestions(q.filter(
              (backendQuestion) => ((backendQuestion.parentID === null) )
            ).sort(
            (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
          
          // initial setFilter list is the same as backendquestions retrieved from the server.
            setFilterList(q.filter(
              (backendQuestion) => ((backendQuestion.parentID === null) )
            ).sort(
            (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
          
          
          setLoading(false);
        }catch(err){
          console.error("Questions.js Loading Questions from queries error", err);
        
          setBackendQuestions([]);
          setLoading(false);
         // alert("Error getting all the questions from database");
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
          //alert("Error getting question voltes from database");
        }
      };


        loadQuestions();
        loadVotes();
        
                      
      }, [user, setFilterList]);

     
      // const rootQuestions =  backendQuestions.filter(
      //   (backendQuestion) => ((backendQuestion.parentID === null) )
      // ).sort(
      //   (a, b) =>
      //   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      // ); 

        const handleVoteFilterSwitch = () => {               
          setIsVoteFilterChecked(!isVoteFilterChecked);  
         
         
          if(!isVoteFilterChecked){
            const voteFilteredList = filterList.filter(
             (backendQuestion) => (((new Date(backendQuestion.voteEndAt) - new Date() > 1 ) 
                           && (backendQuestion.parentID === null)) )
             ).sort(
               (a, b) =>
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
             ); 
             console.log("handleVoteFilterSwitch question ",isQuestionFilterChecked ); 
             console.log("handleVoteFilterSwitch vote ",isVoteFilterChecked, voteFilteredList );             
           setFilterList(voteFilteredList); 

           //both swithes are on
           if(isQuestionFilterChecked){
            console.log("both switches are on");
           // setFilterList([...new Set([...voteFilteredList,...filterList])]);
          }else{
            //only this switch is on
            console.log("only vote swich is on");
            
          }
          setFilterList(voteFilteredList); 
         }else{
          setFilterList(backendQuestions); 
         }
          
          
                 
        }; 

        const handleQuestionFilterSwitch =() => {    
          setIsQuestionFilterChecked(!isQuestionFilterChecked);   
        
          if(!isQuestionFilterChecked){
            const id = user.id;
            console.log("Questions.js checkFilteredList for question looking for user ",id );
            const questionFilteredList = filterList.filter(
              (backendQuestion) => ((backendQuestion.parentID === null) && 
                                    ( backendQuestion.userID === id) )
              ).sort(
                (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            console.log("handleQuestionFilterSwitch question ",isQuestionFilterChecked, questionFilteredList ); 
            console.log("handleQuestionFilterSwitch vote ",isVoteFilterChecked );     

            //both swithes are on
            if(isVoteFilterChecked){
              console.log("both switches are on");
             // setFilterList([...new Set([...questionFilteredList,...filterList])]);
            }else{
              //only this switch is on
              console.log("only question swich is on");
             
            }
            setFilterList(questionFilteredList); 
          }else{
           setFilterList(backendQuestions); 
          }         
        }
         
        // console.log("checkFilteredList isVoteFilterChecked init", isVoteFilterChecked);
        // console.log("checkFilteredList isQuestionFilterChecked init", isQuestionFilterChecked);
      
      const checkFilteredList = () => {

        let questionFilteredList =[];
        let voteFilteredList =[];
        let showVote = false;
        let showQuestion = false;
        console.log("checkFilteredList isVoteFilterChecked", isVoteFilterChecked);
        console.log("checkFilteredList isQuestionFilterChecked", isQuestionFilterChecked);
        if(!isVoteFilterChecked){
           voteFilteredList = backendQuestions.filter(
            (backendQuestion) => (((new Date(backendQuestion.voteEndAt) - new Date() > 1 ) 
                          && (backendQuestion.parentID === null)) )
            ).sort(
              (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ); 
          console.log("Questions.js checkFilteredList for vote ",voteFilteredList );
          showVote = true;
          console.log("Questions.js checkFilteredList showVote ",showVote );
        }

        if(!isQuestionFilterChecked){
          const id = user.id;
          console.log("Questions.js checkFilteredList for question looking for user ",id );
          questionFilteredList = backendQuestions.filter(
            (backendQuestion) => ((backendQuestion.parentID === null) && 
                                  ( backendQuestion.userID === id) )
            ).sort(
              (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          console.log("Questions.js checkFilteredList for question ",questionFilteredList );
          showQuestion = true;
          console.log("Questions.js checkFilteredList showQuestion ",showQuestion );
        }


        if ( !showQuestion && !showVote){
          console.log("Questions.js checkFilteredList 0 0", backendQuestions);
          return backendQuestions;           
        }

        if (!showQuestion && showVote ) {
          console.log("Questions.js checkFilteredList 0 1", voteFilteredList);    
          return voteFilteredList;
        }

        if (showQuestion && !showVote ) {
          console.log("Questions.js checkFilteredList 1 0", questionFilteredList);
          return questionFilteredList;
        }

        if (showQuestion && showVote ) {
          console.log("Questions.js checkFilteredList 1 1");
          return [...new Set([...questionFilteredList,...voteFilteredList])];
        }


      }
           
    

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
            await Mutations.DeleteQuestion(
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

      // console.log("backendQuestion", backendQuestions);
      // console.log("filterList questions", filterList);      

      return ( 
        <>
            {loading && <Loading />}
            {( !loading && showNoQuestions ) && <Alert type="warning" text="No questions retrieved. Start one!" link={ROUTES[state.lang].NEW_QUESTION} />}          
            <div className="row border border-1 ">
              <div className=" col-md-4">
                 <Switch label={"Only open questions"}
                    handleSwitch={handleVoteFilterSwitch}/> 
              </div>
              <div className=" col-md-4">                
                  <Switch label={"Only my questions"}
                    handleSwitch={handleQuestionFilterSwitch}/>   
              </div>
              </div>     
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