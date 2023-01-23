import React from 'react';
import '../pages.css';
import './../profile-nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useOutletContext } from "react-router-dom";
import Questions from '../../Components/Questions/Questions';

function Main() {  
  //const {accessToken, idToken, refreshToken} = user.signInUserSession;
  //console.log("user from Main", user);
  const { user } = useOutletContext();
  return (
    <div className="App profile ">        
        <div className="white-bg container border border-2 p-2 d-flex flex-column">
                  <h3>Decisions made simple</h3>    
        </div>               
        <hr className="m-0"></hr>       
        <Questions           
            user= {user}
        />            
    </div>
  );
}

export default Main;
