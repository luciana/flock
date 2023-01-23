import { useState } from "react";

const Input = ({ type, placeholder, value, handler, showTooltip, label }) => {
  const [inputType, setInputType] = useState(type);
  const [tooltip, setTooltip] = useState(false);

  function handleChangeInputType() {
    if (inputType === "password") setInputType("text");
    else if (inputType === "text") setInputType("password");
  }

  return (
    <>       
        <   label  className="form-label">{label}</label>      
            <input
                type={inputType}
                value={value}
                onChange={(e) => handler(e.target.value)}
                className=" form-control"
                placeholder={placeholder}
            />    
        {type === "password" && (          
           <span  className="form-text">
            <ul
                    className={`${
                    tooltip ? "d-block flex" : "d-none"
                    } flex-col text-left`}>
                    <li>Must have at least 8 chars</li>
                    <li>Requires Lowercase</li>
                    <li>Requires Uppercase</li>
                    <li>Requires Number</li>            
                </ul>
           </span>
         
        )}        
        </>
  );
};

export default Input;