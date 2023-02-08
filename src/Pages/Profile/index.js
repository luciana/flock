

import { useEffect, useState, useContext } from "react";
import { useOutletContext, useNavigate} from "react-router-dom";
import { LANGUAGES, ROUTES, TAGS } from "../../Constants";
import { AppContext } from "../../Contexts";
import Auth from "../../Services/auth";
import Mutations from "../../Services/mutations";
import { Alert, Button, Form, Input, Select, Title, Card } from "../../Components";
import { isValidEmail } from "../../Helpers";

export default function Profile() {
  const { state } = useContext(AppContext);
  const { user } = state;
  const navigate = useNavigate();
  const { loadUser, setLoading, handleSignOut } = useOutletContext();
  const [alert, setAlert] = useState();
  const [showCode, setShowCode] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [tag, setTag] = useState("");
  const [voteCounts, setVoteCounts] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [language, setLanguage] = useState(user.locale);

  //const disabled = () => email === "" || !isValidEmail(email);

  useEffect(() => {
    user && setEmail(user?.email) 
    user && setName(user?.name)   
    user && setTag(user?.userTag === null ? "" : user.userTag)
    userVoteCount();
  }, [user]);

  
  const loading = () => {
    setAlert()
    setLoading(true);
  }
  const handleErrors = (message) => {
    let errorMessage = message;
    switch (message) {
      case "Attempt limit exceeded, please try after some time.":
        errorMessage = LANGUAGES[user.locale].CommonError.AttemptLimit;
        break;
      case "An account with the given email already exists.":
        errorMessage = LANGUAGES[user.locale].CommonError.Email;
        break;
      case "Invalid verification code provided, please try again.":
        errorMessage = LANGUAGES[user.locale].CommonError.CodeError;
        break;
      case "Incorrect username or password.":
        errorMessage = LANGUAGES[user.locale].CommonError.Password;
        break;
      case "Password did not conform with policy: Password must have symbol characters":
        errorMessage = LANGUAGES[user.locale].CommonError.NewPassword;
        break;
      default:
        errorMessage = message;
    }
    setAlert({ type: "error", text: errorMessage });
  };

  const handleChangeEmail = async () => {
    loading();
    try {
      await Auth.ChangeEmail(email);
      setShowCode(true);
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handleChangeName = async () => {
    loading();
    try {
      await Auth.ChangeName(name);
      setShowCode(true);
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    loading();
    try {
      await Auth.ConfirmChangeEmail(code);
      await Mutations.UpdateUser({ id: user.id, email, locale: user.locale });
      loadUser({ force: true, email });
      setShowCode(false);
      setAlert({
        type: "success",
        text: LANGUAGES[user.locale].Profile.EmailSuccess,
      });
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handlePassword = async () => {
    loading();
    try {
      await Auth.ChangePassword(currentPassword, newPassword);
      setAlert({
        type: "success",
        text: LANGUAGES[user.locale].Profile.PasswordSuccess,
      });
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handleChangeLanguage = async () => {
    loading();
    try {
      await Auth.ChangeLanguage(language);
      await Mutations.UpdateUser({ id: user.id, email: user.email, locale: language });
      loadUser({ force: true, email: user.email });
      navigate(ROUTES[language].PROFILE);
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    }
    setLoading(false);
  };

  const handleUserTag = async () => {
    loading();
    try {    
      console.log("handleUserTag");
      await Mutations.UpdateUserTag({ id: user.id, userTag: tag });
      loadUser({ force: true, email: user.email });
      navigate(ROUTES[language].PROFILE);
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    }
    setLoading(false);
  };

  const disabledEmail = () =>
    !email || email === user.email || !isValidEmail(email);

  const disabledCode = () => !code || code.length > 6;

  const disabledName = () => !name || name.length < 0;

  const disabledTag = () => tag === user.userTag;

  const disabledPassword = () =>
    !currentPassword ||
    newPassword !== repeatPassword ||
    newPassword.length < 8;

  const disabledLanguage = () => language === user.locale;

  const userVoteCount = () => {
   
    if (user.votes) {
        setVoteCounts(JSON.parse(user.votes).length);
    }
   
  }

  const renderEmail = () => (
    <>
      <Input
        type="email"
        placeholder={LANGUAGES[user.locale].Email}
        value={email}
        handler={setEmail}
      />
      <Button
        text={LANGUAGES[user.locale].Profile.ChangeEmail}
        disabled={disabledEmail()}
        handler={() => handleChangeEmail()}
      />
    </>
  );

  const renderChangeName = () => (
    
     
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
      <label className="form-label">{LANGUAGES[user.locale].Profile.YourName}</label>
      <Input
        type="text"
        placeholder={LANGUAGES[user.locale].Name}
        value={name}
        handler={setName}
      />
      <Button
        text={LANGUAGES[user.locale].Profile.ChangeName}
        disabled={disabledName()}
        handler={() => handleChangeName()}
      />
    </div>
    </Form>
  );

  const renderCode = () => (
    <>
      <Title
        text={LANGUAGES[user.locale].Profile.CodeAlert}
        color="text-amber-500"
        size="text-sm"
      />
      <Input type="text" placeholder="Code" value={code} handler={setCode} />
      <Button
        text="Send Code"
        disabled={disabledCode()}
        handler={() => handleVerifyCode()}
      />
    </>
  );

  const renderChangeEmail = () => (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        {!showCode ? renderEmail() : renderCode()}
      </div>
    </Form>
  );

  const renderChangePassword = () => (

  <div className="card">
    <div className="card-header">
    {LANGUAGES[user.locale].Profile.ChangePassword}
    </div>
     <div className="card-body">  
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        <Input
          type="password"
          placeholder={LANGUAGES[user.locale].Profile.CurrentPassword}
          value={currentPassword}
          handler={setCurrentPassword}
        />
        <Input
          type="password"
          placeholder={LANGUAGES[user.locale].Profile.NewPassword}
          value={newPassword}
          handler={setNewPassword}
          showTooltip
        />
        <Input
          type="password"
          placeholder={LANGUAGES[user.locale].Profile.RepeatNewPassword}
          value={repeatPassword}
          handler={setRepeatPassword}
        />
        <Button
          text={LANGUAGES[user.locale].Profile.ChangePassword}
          disabled={disabledPassword()}
          handler={() => handlePassword()}
        />
      </div>
    </Form>
    </div>
</div>
  );


  const renderChangeTag = () => (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
      <label className="form-label"> {LANGUAGES[user.locale].Profile.YourExpertise}</label>
        <Select value={tag} handler={setTag}>            
          {TAGS.map((l) => (
            <option key={l} value={l}>
              {LANGUAGES[user.locale].Tags[l]}
            </option>
          ))}
        </Select>
        <Button
          text={LANGUAGES[user.locale].Profile.ChangeTag}
          disabled={disabledTag()}
          handler={() => handleUserTag()}
        />
      </div>
    </Form>
  );

  const renderChangeLanguage = () => (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
      <label className="form-label">{LANGUAGES[user.locale].Profile.LanguagePreference}</label>
        <Select value={language} handler={setLanguage}>
          {Object.keys(LANGUAGES).map((l) => (
            <option key={l} value={l}>
              {LANGUAGES[user.locale].Languages[l]}
            </option>
          ))}
        </Select>
        <Button
          text={LANGUAGES[user.locale].Profile.ChangeLanguage}
          disabled={disabledLanguage()}
          handler={() => handleChangeLanguage()}
        />
      </div>
    </Form>
  );
  console.log("User from profile", user);

  return (
   <div className="container">     
      <Alert type={alert?.type} text={alert?.text} />
      <Card voteCounts={voteCounts} 
          handleSignOut={handleSignOut} />
     
      <hr className="m-3"></hr>  

      <div className="grid sm:grid-cols-3 gap-2">  
       <div className="card">
        <div className="card-header">
          Change Your Profile Info
        </div>
        <div className="card-body">             
          {renderChangeName()}
          {renderChangeTag()}
          {renderChangeLanguage()}
        </div>
        </div>

        {renderChangePassword()}
       
      </div>
          <hr className="m-0"></hr>                   
   </div>
  
  );
}