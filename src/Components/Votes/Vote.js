import React, {useState} from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { userByEmail } from '../../graphql/queries';

const Vote = ({ question,
             handleVote,             
             updateVotedList,      
             votedOptionsList,
             updateVotedOptionsList,
             alreadyVotedForQuestionList,
             voteEnded }) => {

    const items = JSON.parse(question.options);
    if (!items) return;

//    console.log("Votes items", items);
   
    let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;

    const voteUp = id => {
     
      if (alreadyVotedForQuestionListBool) {
        return;
      }if (votedOptionsList.includes(id)){
        return;
      }else{        
        let i = [...items];
        let item = i.find(x => x.id === id);          

      //user.votes = "[{\"optionId\":3942,\"questionId\":\"7998615d-88dd-427a-a20f-1a2851d009b3\"}]"
      //question.options = [{\"votes\":0,\"id\":3293,\"text\":\"cancun\",\"isComplete\":true},{\"votes\":0,\"id\":9623,\"text\":\"punta cana?\",\"isComplete\":true}]
        let userVote ={
          "optionId": id,
          "questionId": question.id,  
        };

        let questionOption = {         
          "optionId": id,
          "questionId": question.id,  
          "votes": item.votes++    
          }
        updateVotedList(questionOption);
        votedOptionsList.push(id);
        handleVote(question, questionOption, userVote);
      } 
      
    };

    const iVotedForIt = ( id ) =>  {      
      return votedOptionsList.includes(id)
    }

    // console.log("votedList in Vote", votedList);
    // console.log("votedOptionsList in Vote", votedOptionsList);
    // console.log("alreadyVotedForQuestionList in Vote",alreadyVotedForQuestionList);


  return items.map((item, index) => (
    <div className='container p-3 border-bottom bg-light ' key={index} >
          <div className="row ">            
              <div key={item.id} onClick={() => voteUp(item.id)} className={iVotedForIt(item.id) ? 'col  ' : 'col  '}>
                <span className="badge rounded-pill bg-light text-dark mx-2 ">{item.votes}</span> 
                {item.text}
              </div>
            
            <div className="col ">                   
                <button className=" mx-5 badge border-0 bg-light"  
                  disabled={(voteEnded || alreadyVotedForQuestionListBool) ? true : false}                   
                  onClick={() => voteUp(item.id)}>                             
                  { (iVotedForIt(item.id) ) && (
                    <FaCircle color='green' size={24}/>
                  )}
                  { (!iVotedForIt(item.id) && voteEnded )&& (
                    <FaRegCircle color='gray' size={24}/>
                  )}
                  { (!iVotedForIt(item.id) && !voteEnded )&& (
                    <FaRegCircle color='black'  size={24}/>
                  )}                                 
                </button>                   
            </div>              
          </div>
          </div>
         
   
  ));
};

export default Vote;