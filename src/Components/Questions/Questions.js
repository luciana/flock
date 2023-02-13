import { useState, useEffect, useContext } from "react";
import Question from "./Question";
import QuestionService from '../../Services/QuestionService';
import { Loading, Alert, Switch, Friends }  from '../../Components';
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
    const [questionFilteredList, setQuestionFilteredList] =    useState([]);
    const [voteFilteredList, setVoteFilteredList] =    useState([]);
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const [filterList, setFilterList]= useState([]);
    const [userFriends, setUserFriends]= useState([]);
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
            console.log("list of question backendQuestions", backendQuestions);
         
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

      const getUsersYouHelped = () => {
        console.log("Questions that user voted ", votedList);     
        const listOfQuestionsAnswered =  votedList.map((votedList)=> votedList.questionId);
        console.log("List of questions id that user voted ", listOfQuestionsAnswered);
      //   [
      //     "72a986c9-d35e-4fbf-a96f-c7a610a601e2",
      //     "1ae7b3c4-9f9e-4776-bfb4-4251c1c22651",
      //     "f5b0936d-d418-424e-8a06-2cf4f8baef02",
      //     "c57a605a-0e81-4253-a11e-f6da052eceb9",
      //     "049cd46a-d8cb-40a9-9b50-1c734eca1cd2",
      //     "0866a047-396c-48cf-b7a3-d684d7976489",
      //     "70c880eb-a99e-4702-82f5-bc9bbc930428",
      //     "5bf62d05-c186-4a02-9611-9a66a8e2b5a2"
      // ]
              
        const t =  backendQuestions.filter(
          (backendQuestion) => ((listOfQuestionsAnswered[0] === backendQuestion.questionId) )
        );
        console.log("List of users you helped with votes ", t, listOfQuestionsAnswered[0], backendQuestions);
        setUserFriends(t);
        
            
      }


        loadQuestions();
        loadVotes();
        getUsersYouHelped();
        
                      
      }, [user, setFilterList]);

     
      // const rootQuestions =  backendQuestions.filter(
      //   (backendQuestion) => ((backendQuestion.parentID === null) )
      // ).sort(
      //   (a, b) =>
      //   new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      // ); 

    

     

        const handleVoteFilterSwitch = () => {               
          setIsVoteFilterChecked(!isVoteFilterChecked);  
         console.log("when the user clicks vote filter, the filtered list is ", filterList);
         
          if(!isVoteFilterChecked){
            const v = filterList.filter(
             (backendQuestion) => (((new Date(backendQuestion.voteEndAt) - new Date() > 1 ) 
                           && (backendQuestion.parentID === null)) )
             ).sort(
               (a, b) =>
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
             ); 
             setVoteFilteredList(v);
             console.log("handleVoteFilterSwitch question ",isQuestionFilterChecked ); 
             console.log("handleVoteFilterSwitch vote ",isVoteFilterChecked, v );             
           

           //both swithes are on
           if(isQuestionFilterChecked){
              console.log("both switches are on");
            // setFilterList([...new Set([...voteFilteredList,...filterList])]);
              const filterFromTwoArrays = questionFilteredList.some(item => v.includes(item));
              console.log("combine both vote and question list", filterFromTwoArrays);
              if(filterFromTwoArrays)
                setFilterList(filterFromTwoArrays); 
              setFilterList([]);
            }else{
              //only this switch is on
              console.log("only vote swich is on");  
              setFilterList(v);                     
            }        
           
         }else{
          //vote switch is off
          if(isQuestionFilterChecked){
            console.log("question switch is on and vote switch is off");
           // setFilterList([...new Set([...questionFilteredList,...filterList])]);
           setFilterList(questionFilteredList);
          }else{
            //both switches are off
            setFilterList(backendQuestions); 
          }
  
         }                                   
        }; 

        const handleQuestionFilterSwitch =() => {    
          setIsQuestionFilterChecked(!isQuestionFilterChecked);   
        
          if(!isQuestionFilterChecked){
            const id = user.id;
            console.log("Questions.js checkFilteredList for question looking for user ",id );
            const q = filterList.filter(
              (backendQuestion) => ((backendQuestion.parentID === null) && 
                                    ( backendQuestion.userID === id) )
              ).sort(
                (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            setQuestionFilteredList(q);
            console.log("handleQuestionFilterSwitch question ",isQuestionFilterChecked, q ); 
            console.log("handleQuestionFilterSwitch vote ",isVoteFilterChecked );     

            //both swithes are on
            if(isVoteFilterChecked){
              console.log("both switches are on");
             // setFilterList([...new Set([...questionFilteredList,...filterList])]);
             const filterFromTwoArrays = voteFilteredList.some(item => q.includes(item));
             if(filterFromTwoArrays)
                setFilterList(filterFromTwoArrays); 
              setFilterList([]);
            }else{
              //only this switch is on
              console.log("only question swich is on");
              setFilterList(q); 
            }
           
          }else{
           
            if(isVoteFilterChecked){
              console.log("question switch is off and vote switch is on");
             // setFilterList([...new Set([...questionFilteredList,...filterList])]);
             setFilterList(voteFilteredList);
            }else{
              //both switches are off
              setFilterList(backendQuestions); 
            }
          }         
        }
         
        // console.log("checkFilteredList isVoteFilterChecked init", isVoteFilterChecked);
        // console.log("checkFilteredList isQuestionFilterChecked init", isQuestionFilterChecked);
      
      // const checkFilteredList = () => {

      //   let questionFilteredList =[];
      //   let voteFilteredList =[];
      //   let showVote = false;
      //   let showQuestion = false;
      //   console.log("checkFilteredList isVoteFilterChecked", isVoteFilterChecked);
      //   console.log("checkFilteredList isQuestionFilterChecked", isQuestionFilterChecked);
      //   if(!isVoteFilterChecked){
      //      voteFilteredList = backendQuestions.filter(
      //       (backendQuestion) => (((new Date(backendQuestion.voteEndAt) - new Date() > 1 ) 
      //                     && (backendQuestion.parentID === null)) )
      //       ).sort(
      //         (a, b) =>
      //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //       ); 
      //     console.log("Questions.js checkFilteredList for vote ",voteFilteredList );
      //     showVote = true;
      //     console.log("Questions.js checkFilteredList showVote ",showVote );
      //   }

      //   if(!isQuestionFilterChecked){
      //     const id = user.id;
      //     console.log("Questions.js checkFilteredList for question looking for user ",id );
      //     questionFilteredList = backendQuestions.filter(
      //       (backendQuestion) => ((backendQuestion.parentID === null) && 
      //                             ( backendQuestion.userID === id) )
      //       ).sort(
      //         (a, b) =>
      //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //       );
      //     console.log("Questions.js checkFilteredList for question ",questionFilteredList );
      //     showQuestion = true;
      //     console.log("Questions.js checkFilteredList showQuestion ",showQuestion );
      //   }


      //   if ( !showQuestion && !showVote){
      //     console.log("Questions.js checkFilteredList 0 0", backendQuestions);
      //     return backendQuestions;           
      //   }

      //   if (!showQuestion && showVote ) {
      //     console.log("Questions.js checkFilteredList 0 1", voteFilteredList);    
      //     return voteFilteredList;
      //   }

      //   if (showQuestion && !showVote ) {
      //     console.log("Questions.js checkFilteredList 1 0", questionFilteredList);
      //     return questionFilteredList;
      //   }

      //   if (showQuestion && showVote ) {
      //     console.log("Questions.js checkFilteredList 1 1");
      //     return [...new Set([...questionFilteredList,...voteFilteredList])];
      //   }


      // }
           
    

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
      //console.log("filterList questions", filterList);      

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
            <div><Friends userFriends={userFriends} /></div>
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