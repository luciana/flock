import React, { useContext } from 'react';
import '../pages.css';
import './../profile-nav.css';
import { AppContext} from '../../Contexts';
import Questions from '../../Components/Questions/Questions';
import { Alert } from '../../Components';

function Main() {  
  const { state } = useContext(AppContext);
  const { user } = state;
  console.log("Main.js state", state);
  return (
    <div className="App  ">      
       
        {(!user.name || !user.userTag || !user.gender || !user.address || !user.birthdate) && <Alert type="warning" text="Please, complete the Profile!" link="/Profile" />}
        <div className="white-bg container border border-1 p-2 ">
                <Questions />
        </div>               
        <hr className="m-0"></hr>       
                  
    </div>
  );
}

export default Main;
