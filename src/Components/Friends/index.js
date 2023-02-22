import React from "react";
import { Title } from './../../Components';
import { findCounts } from './../../Helpers';
import Avatar from 'react-avatar';

const Friends = ({votedList, backendQuestions, userId}) => {
    const maxNumberOfFriends = 3;
    let countList =[];
    if(votedList.length>0 && backendQuestions.length>0){
        const votedOnQuestions = backendQuestions.filter((questions) => {
            return votedList.some((voted) => {
            return voted.questionId === questions.id&& voted.questionId === questions.id;
                });
            });        

            //console.log("votedOnQuestions",votedOnQuestions);
          //Those who I helped the most
            countList = findCounts(votedOnQuestions, "userID", "userName")
                            .sort((a, b) => b.value - a.value)
                            .filter((item, idx) => idx < maxNumberOfFriends);
        
            //console.log('counts ',countList);
            //setUserFriends(countList);
    //      [{
    //         "userID": "0714e188-f988-4492-9ddf-6378059c438b",
    //         "userName": "Marcelo Toledo",
    //         "value": 1
    //     },
    //     {
    //         "userID": "dc112cb7-8927-421c-9273-3b1626e4d791",
    //         "userName": "Atanas Dojcinovski",
    //         "value": 3
    //     }
    // ]

            //Those who helped me the most
            const thoseWhoHelpedMe = backendQuestions.filter((backendQuestion) => (               
                (backendQuestion.parentID === null) && backendQuestion.userID === userId && backendQuestion.stats ))
                .map((q) => JSON.parse(q.stats))
                .flat(1)
                .filter((l) => l.userId && l.userName && l.userId !== userId);

            console.log("thoseWhoHelpedMe",thoseWhoHelpedMe);

            const thoseWhoHelpedMeCount = findCounts(thoseWhoHelpedMe, "userId", "userName")
            .sort((a, b) => b.value - a.value)
            .filter((item, idx) => idx < maxNumberOfFriends);
            console.log("thoseWhoHelpedMeCount",thoseWhoHelpedMeCount);
    }
    

return (
<div className="my-2 py-3  px-3 alert-warning">
   <Title text={"Those who I helped the most."}
            size="text-sm"
            color={"var(--bs-gray-700)"} />

    {countList && countList.length > 0  && (
      <div className="row align-items-center ">         
         {countList.map((u, index) => (
            <div key={index} value={u}  className="col-sm-4 align-items-center">            
             <Avatar size="48" name={u.userName} 
                className="rounded-circle mx-auto mb-0 col" 
                alt="{u.userName}" />
             <div className="text-sm lh-1 col"> {u.userName}</div>
            </div>
          ))}
        </div>
    )}
    </div>
  )
    }
export default Friends;