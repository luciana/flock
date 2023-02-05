import React, { useContext } from 'react';
import '../pages.css';
import './../profile-nav.css';

import Questions from '../../Components/Questions/Questions';


function Main() {  
 
  return (
    <div className="App  ">      
       
      
        <div className="white-bg container border border-1 p-2 ">
                <Questions />
        </div>               
        <hr className="m-0"></hr>       
                  
    </div>
  );
}

export default Main;
