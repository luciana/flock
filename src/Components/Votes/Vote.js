import React, {useState} from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

const Vote = ({ question,
             handleVote,             
             updateVotedList,      
             votedOptionsList,
             voteUp,
             updateVotedOptionsList,
             alreadyVotedForQuestionList,
             voteEnded }) => {

    const items = JSON.parse(question.options);
    
    const [counters, setCounters] = useState("");

    if (!items) return;

    let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;
    const iVotedForIt = ( id ) =>  {    
      return votedOptionsList.includes(id)
    }

    // const handleMe = () => {
    //   setCounters(
    //     counters[index]; // assign the object at the index to a variable
    //     obj.value++; // increment the value in the object
    //     state.counters.splice(index, 1); // remove the object from the array
    //     return { counters: [...state.counters, obj] };
    //   );

    // }

    // console.log("Vote.js votedList in Vote", votedList);
    // console.log("Vote.js votedOptionsList in Vote", votedOptionsList);
    // console.log("Vote.js alreadyVotedForQuestionList in Vote",alreadyVotedForQuestionList);


  return items.map((item, index) => (
   
    <div className='container p-3 border-bottom bg-light ' key={index} >
          <div className="row ">            
              <div key={item.id} onClick={() => voteUp(item)} className={iVotedForIt(item.id) ? 'col  ' : 'col  '}>
                <span className="badge rounded-pill bg-light text-dark mx-2 ">{item.votes}</span> 
                {item.text}
              </div>
            
            <div className="col ">                   
                <button className=" mx-5 badge border-0 bg-light"  
                  disabled={(voteEnded || alreadyVotedForQuestionListBool) ? true : false}                   
                  onClick={() => voteUp(item)}>                             
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