import { useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Button, Badge } from '..';
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import './Card.css';

const Card = ({voteCounts}) => {

  const { state } = useContext(AppContext);
  const { user } = state;
  console.log("Profile Card user", user);
  const navigate = useNavigate();
  return (

    
<div className="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
  <div className="card p-4"> 
    <div className=" image d-flex flex-column justify-content-center align-items-center"> 
    
    <Badge count={user.userTag.length} />
   
    <span className="profile-name mt-3">{user.name}</span> 
    <span className="idd">{user.email}</span>    
    {user.userTag.length > 0 && (
        <span className="idd">
        #{user.userTag}
        </span> 
    )}  
    <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
      <span className="idd1">{user.id}</span> 
      <span><i className="fa fa-copy"></i></span> 
    </div> 
    <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
      <span className="follow">{LANGUAGES[user.locale].Profile.LanguagePreference + " : "}</span>
      <span> {LANGUAGES[user.locale].Languages[user.locale]  }</span>
      <span><i className="fa fa-edit"></i></span> 
    </div>    
      {voteCounts.length >0 && 
        ( 
          <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
            <span className="number">{voteCounts} <span className="follow">helped decisions</span></span> 
          </div>)
      }
    <div className=" d-flex mt-2"> 
    <Button text="Edit Profile"
                disabled={true}
                handler={()=>navigate("/#profile_edit")}
                 />
    </div>    
    <div className=" px-2  mt-4  "> 
        <span className="join">Joined {user.createdAt}</span> 
    </div> 
  </div> 
  </div>
</div>
  );
};

export default Card;