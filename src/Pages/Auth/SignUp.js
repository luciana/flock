import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { AuthLink, AuthTitle, Input } from "../../Components";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES } from "../../Constants";

export default function SignUp() {
  const location = useLocation();
  const { state } = useContext(AppContext);
  const { setAlert, signUp } = useOutletContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");
  const [accept, setAccept] = useState(false);

  useEffect(() => {
    setAlert(location?.state?.alert);

  }, [location?.state?.alert, setAlert]);

  const isValidPassword =  (pwd) => {
    const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\-^$*.\[\]{}()?"!@#%&/\\,><':;|_~`])\S{8,99}$/);
    const isOk = re.test(pwd);
    return isOk;
  }
  
  const disabled = () =>
    email === "" ||
    !isValidEmail(email) ||
    name === "" ||
    pwd === "" ||
    !isValidPassword(pwd) ||
    repeat === "" ||
    pwd !== repeat ||
    accept === false    

    const handlePassword = (p) =>{
      setPwd(p);
      console.log("checking password", p);
      if(!isValidPassword(p)){
       setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.NewPassword});  
      }else{
        setAlert();
      }    
    }

    const handleRepeatPassword = (r) =>{
      setRepeat(r);
      console.log("checking repead password", r);
      if( r === "" || pwd !== r ){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.RepeatPassword});  
      }else{
        setAlert();
      }    
    }

    const handleEmail = (e) =>{
      setEmail(e);
      console.log("checking email", e);
      if(!isValidEmail(e)){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidEmail});  
      }else{
        setAlert();
      }   
    }

    const handleName = (n) =>{
      setName(n);
      console.log("checking name", n);
      if(n === ""){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidName});  
      }else{
        setAlert();
      }   
    }

  return (
    <form className="form-control needs-validation novalidate">
    <AuthTitle text={LANGUAGES[state.lang].Auth.SignUpTitle} />  
      <div className="mb-4">
      <label className="form-label">{LANGUAGES[state.lang].Name} <span className="req">*</span></label>
        <Input
          type="text"
          label={LANGUAGES[state.lang].Name}      
          placeholder={LANGUAGES[state.lang].Name} 
          value={name}
          handler={handleName}         
        /> 
      </div>
      <div className="mb-4">
      <label className="form-label">{LANGUAGES[state.lang].Email} <span className="req">*</span></label>
        <Input
          type="email"
          label={LANGUAGES[state.lang].Email}     
          placeholder={LANGUAGES[state.lang].Email}
          value={email}
          handler={handleEmail}         
        />       
      </div>
      <div className="mb-4">
      <label className="form-label">{LANGUAGES[state.lang].Password} <span className="req">*</span></label>
        <Input
          type="password"
          label={LANGUAGES[state.lang].Password}
          placeholder={LANGUAGES[state.lang].Password}
          value={pwd}
          handler={handlePassword}          
          showTooltip         
        />    
      </div>      
      <div className="mb-4">
      <label className="form-label">{LANGUAGES[state.lang].Auth.RepeatPassword} <span className="req">*</span></label>
        <Input
          type="password"
          label={LANGUAGES[state.lang].Auth.RepeatPassword}
          placeholder={LANGUAGES[state.lang].Auth.RepeatPassword}
          value={repeat}
          handler={handleRepeatPassword}         
        />       
      </div>
      <div className="py-2 my-2">
          <div><strong>Password Requirements:</strong></div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Minimum eight characters</li>
              <li className="list-group-item">Have at least one uppercase letter</li>
              <li className="list-group-item">Have at least one lowercase letter</li>            
              <li className="list-group-item">Have at least one digit</li>
              <li className="list-group-item">Have at least one one special character</li>              
            </ul>            
      </div>
    <div className="form-check my-3">    
      <input
        type="checkbox"       
        id="invalidCheck" 
        checked={accept}       
        onChange={() => setAccept(!accept)}
        className="form-check-input h-4 w-4 border border-gray-300 rounded-sm "
      />
      <label className="form-check-label" htmlFor="invalidCheck">
        {LANGUAGES[state.lang].Auth.TermsandConditions} <span className="req">*</span>
      </label>     
    </div>
      <button       
        disabled={disabled()}
        className="btn btn-outline-primary rounded-pill "
        type="submit"
        onClick={() => signUp(email, pwd, name, repeat)}
        
      >{LANGUAGES[state.lang].Auth.SignUpButton} </button>
      <div className="w-full text-center mt-6">
        <AuthLink text={LANGUAGES[state.lang].Auth.GoToSignIn} to={ROUTES[state.lang].SIGN_IN} size="xl" />
      </div>
    </form>
  );
}