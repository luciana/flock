import React from "react";
import { findCounts } from './../../Helpers';
import Avatar from 'react-avatar';

const Friends = ({votedList, backendQuestions, userId}) => {
    const maxNumberOfFriends = 5;   
    let thoseWhoIHelpedCount =[];
    let thoseWhoHelpedMeCount=[];
    let friends=[];

    if(backendQuestions.length>0){
      if(votedList.length>0){
        //Those who I helped the most
        const votedOnQuestions = backendQuestions.filter((questions) => {
            return votedList.some((voted) => {
            return voted.questionId === questions.id&& voted.questionId === questions.id;
                });
            });            
      
        thoseWhoIHelpedCount = findCounts(votedOnQuestions, "userID", "userName")
                            .sort((a, b) => b.value - a.value)
                            .filter((item, idx) => idx < maxNumberOfFriends);
      }

      //Those who helped me the most
      const thoseWhoHelpedMe = backendQuestions.filter((backendQuestion) => (               
          (backendQuestion.parentID === null) && backendQuestion.userID === userId && backendQuestion.stats ))
          .map((q) => JSON.parse(q.stats))
          .flat(1)
          .filter((l) => l.userId && l.userName && l.userId !== userId);

       // console.log("thoseWhoHelpedMe",thoseWhoHelpedMe);
      if (thoseWhoHelpedMe && thoseWhoHelpedMe.length > 0){
         thoseWhoHelpedMeCount = findCounts(thoseWhoHelpedMe, "userId", "userName")
        .sort((a, b) => b.value - a.value)
        .filter((item, idx) => idx < maxNumberOfFriends);       
      }
    }
    console.log("thoseWhoIHelpedCount",thoseWhoIHelpedCount);
    console.log("thoseWhoHelpedMeCount",thoseWhoHelpedMeCount);
    const showFriendsSection = (thoseWhoHelpedMeCount && thoseWhoHelpedMeCount.length >0) || (thoseWhoIHelpedCount && thoseWhoIHelpedCount.length >0);

    if (showFriendsSection ){
      
      //fix issue with userID and userId as properties in the two merged arrays
      // this code can be deleted afterwhile.
      // this was created to fix an issue where stat model data used userId and question model data userID
      const thoseWhoHelpedMeCountCorrected = thoseWhoHelpedMeCount.map(({ userId: userID, userName: userName, value: value }) => ({
        userID,
        userName,
        value,
      }));
      console.log("thoseWhoHelpedMeCountCorrected",thoseWhoHelpedMeCountCorrected);

      const mergeResult = [...thoseWhoIHelpedCount, ...thoseWhoHelpedMeCountCorrected];
      console.log("mergeResult",mergeResult);
      friends = findCounts(mergeResult, "userID", "userName")
                .sort((a, b) => b.value - a.value)
                .filter((item, idx) => idx < maxNumberOfFriends);
      console.log("friends",friends);
    }
   
   
return (
  <>
    {showFriendsSection && (
      <div className="my-2 py-3  px-3 alert-warning">       
          {friends && friends.length > 0  && (
            <div className="row align-items-center ">         
              {friends.map((u, index) => (
                  <div key={index} value={u}  className="col-sm-2 d-flex mx-3 my-1  align-items-center">            
                  <Avatar size="48" name={u.userName} 
                      className="rounded-circle mx-auto mb-0 mx-1" 
                      alt="{u.userName}" />
                  <div className="mx-1 text-sm lh-1 col"> {u.userName}</div>
                  </div>
                ))}
              </div>
          )}
      </div>
    )}
  </>
  )
}
export default Friends;