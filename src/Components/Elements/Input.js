import { useState } from "react";
import { RiEyeLine } from 'react-icons/ri';

const Input = ({ type, placeholder, value, handler, showTooltip, error }) => {
  const [inputType, setInputType] = useState(type);

  function handleChangeInputType() {
    if (inputType === "password") setInputType("text");
    else if (inputType === "text") setInputType("password");
  }

  return (


<div className="input-group mb-3">
      <input
        type={inputType}
        value={value}
        onChange={(e) => handler(e.target.value)}
        className={`form-control block w-full px-4 py-2 font-normal border border-1  rounded transition ease-in-out m-0 focus:border-2 focus:outline-none ${!error ? 'border-gray-300' : 'border-danger'}`}
        placeholder={placeholder}
      />
      {type === "password" && (            
         <button className="btn btn-outline-secondary" onClick={() => handleChangeInputType()} type="button" ><RiEyeLine /></button>      
      )}
    </div>
  );
};

export default Input;