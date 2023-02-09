import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { AuthLink, AuthTitle, Input, Title, Select, DatePicker } from "../../Components";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES, GENDER } from "../../Constants";

export default function SignUp() {
  const location = useLocation();
  const { state } = useContext(AppContext);
  const { setAlert, signUp } = useOutletContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");
  const [accept, setAccept] = useState(false);
  const [zip, setZip] = useState("");
  const [birthday, setBirtday] = useState("");
  const [gender, setGender] = useState("female");

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
      if( r === "" || pwd !== r ){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.RepeatPassword});  
      }else{
        setAlert();
      }    
    }

    const handleEmail = (e) =>{
      setEmail(e);     
      if(!isValidEmail(e)){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidEmail});  
      }else{
        setAlert();
      }   
    }

    const handleBirthday = (b) => {
     
      //convert 2023-02-23 to AWSDate format 1970-01-01Z
      setBirtday(b+"Z");
    }
    const handleZip = (z) => {
      setZip(z);
      
      if(z && z.length < 5){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidZip}); 
      }else{
        setAlert();
      }
    }
    const handleName = (n) =>{
      setName(n);     
      if(n === ""){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidName});  
      }else{
        setAlert();
      }   
    }

    console.log("birthday date selected", birthday);
  return (
    <>
    <form className=" form-control">
    <AuthTitle text={LANGUAGES[state.lang].Auth.SignUpTitle} />  
      <div className="mb-4">      
        <Input
          type="text"
          label={LANGUAGES[state.lang].Name}      
          placeholder={LANGUAGES[state.lang].Name} 
          value={name}
          handler={handleName}  
          required={true}       
        /> 
      </div>
      <div className="mb-4">      
        <Input
          type="email"
          label={LANGUAGES[state.lang].Email}     
          placeholder={LANGUAGES[state.lang].Email}
          value={email}
          handler={handleEmail}  
          required={true}            
        />       
      </div>
      <div className="mb-4">      
        <Input
          type="password"
          label={LANGUAGES[state.lang].Password}
          placeholder={LANGUAGES[state.lang].Password}
          value={pwd}
          handler={handlePassword}          
          showTooltip      
          required={true}        
        />    
      </div>      
      <div className="mb-4">      
        <Input
          type="password"
          label={LANGUAGES[state.lang].Auth.RepeatPassword}
          placeholder={LANGUAGES[state.lang].Auth.RepeatPassword}
          value={repeat}
          handler={handleRepeatPassword}  
          required={true}            
        />       
      </div>
     

      <div className="form-control">
        <Title text={"If you care to share"}
               size={"text-sm"}
               color={"text-color-gray"} />
      
      <div className="row">               
        <div className="col">
          <Input 
            type={"number"}
            label={LANGUAGES[state.lang].ZipCode}
            placeholder={LANGUAGES[state.lang].ZipCode}
            handler={handleZip} />          
        </div>
        <div className="col">        
          <label className="form-label py-1">{LANGUAGES[state.lang].Gender} </label> 
          <Select  value={gender} handler={setGender}>         
            {GENDER.map((l) => (            
             <option key={l} value={l}>
               {LANGUAGES[state.lang].Genders[l]}
            </option>
            ))}
        </Select>        
        </div>
        <div className="col">
          <DatePicker 
            placeholder={LANGUAGES[state.lang].Birth} 
            label={LANGUAGES[state.lang].Birth} 
            name={"dob"}
            handler={handleBirthday}
            />          
        </div>
      </div>
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
          <AuthLink text={LANGUAGES[state.lang].Auth.TermsandConditions} to={ROUTES[state.lang].TERMS} />
          <span className="req">*</span>
        </label>     
      </div>

      <div>
        <button       
          disabled={disabled()}
          className="btn btn-outline-primary rounded-pill "
          type="submit"
          onClick={() => signUp(email, pwd, name, repeat, gender, zip, birthday)}
          
        >{LANGUAGES[state.lang].Auth.SignUpButton} </button>
      </div>


      <div className="py-4 my-4">
          <div><strong>Password Requirements:</strong></div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Chars}</li>
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Lowercase}</li>
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Uppercase}</li>            
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Number}</li>
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Symbol}</li>              
            </ul>            
      </div>
      <div className="w-full text-center">
        <AuthLink text={LANGUAGES[state.lang].Auth.GoToSignIn} to={ROUTES[state.lang].SIGN_IN} size="xl" />
      </div>
    </form>
    <div className="py-4"><hr className="my-4" /></div>
    </>
  );
}