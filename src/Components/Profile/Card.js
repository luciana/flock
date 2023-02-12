import { useContext } from "react";
import { Badge } from '..';
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import './Card.css';

const Card = ({voteCounts}) => {

  const { state } = useContext(AppContext);
  const { user } = state;

  const userCount = (user.userTag) ? user.userTag.length : 1;
  return (

    
<div className=" mt-1 mb-1 p-3 d-flex justify-content-center"> 
  <div className="border border-1 mx-2 p-4"> 
    <div className=" image d-flex flex-column justify-content-center align-items-center"> 
    
    <Badge count={userCount} />
   
    <span className="profile-name mt-1">{user.name}</span> 
    <span className="">{user.email}</span>    
    {user.userTag && user.userTag.length > 0 && (
        <span className="">
        #{user.userTag}
        </span> 
    )}  

      {/* TODO: do not display this just yet */}
    { false && (
        <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
        <span className="">{user.id}</span> 
        <span><i className="fa fa-copy"></i></span> 
      </div> 
    )}
    
    <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
      <span className="follow">{LANGUAGES[user.locale].Profile.LanguagePreference + " : "}</span>
      <span> {LANGUAGES[user.locale].Languages[user.locale]  }</span>
      <span><i className="fa fa-edit"></i></span> 
    </div>    
      {voteCounts >0 && 
        ( 
          <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
            <span className="number">{voteCounts} <span className="follow">helped decisions</span></span> 
          </div>)
      }
    
    <div className=" px-2  mt-4  "> 
        <span className="join">Joined {user.createdAt}</span> 
    </div> 
  </div> 
  </div>
</div>
  );
};

export default Card;