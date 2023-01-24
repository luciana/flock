import { useState, useContext } from "react";
import { AppContext } from "../Contexts";
import { LANGUAGES } from "../Constants";
const Input = ({ type, placeholder, value, handler, showTooltip, error }) => {
  const { state } = useContext(AppContext);
  const [inputType, setInputType] = useState(type);
  const [tooltip, setTooltip] = useState(false);

  function handleChangeInputType() {
    if (inputType === "password") setInputType("text");
    else if (inputType === "text") setInputType("password");
  }

  return (
    <div className="relative">
      <input
        type={inputType}
        value={value}
        onChange={(e) => handler(e.target.value)}
        className={`block w-full px-4 py-2 font-normal border border-solid rounded transition ease-in-out m-0 focus:border-indigo-500 focus:outline-none ${!error ? 'border-gray-300' : 'border-red-500'}`}
        placeholder={placeholder}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => handleChangeInputType()}
          className=""
        >
         Show PAssword
        </button>
      )}
      {showTooltip && (
        <>
          <button
            type="button"
            onMouseOver={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            className=""
          >
           Show Tooltip
          </button>
          <ul           
          >
            <li>{LANGUAGES[state.lang].PasswordRules.Chars}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Lowercase}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Uppercase}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Number}</li>
            <li>{LANGUAGES[state.lang].PasswordRules.Symbol}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Input;