import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, AuthTitle, Input } from "../../Components";
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

  useEffect(() => {
    setAlert(location?.state?.alert);
  }, [location?.state?.alert, setAlert]);

  const disabled = () =>
    email === "" ||
    !isValidEmail(email) ||
    pwd === "" ||
    repeat === "" ||
    pwd !== repeat;

  const appname = process.env.REACT_APP_TITLE;
  console.log('app name', appname);

  return (
    <form className="form-control">
    <AuthTitle text={LANGUAGES[state.lang].Auth.SignUpTitle} />  
      <div className="mb-4">
        <Input
          type="text"
          label="Name"     
          placeholder="name"
          value={name}
          handler={setName}
        />
      </div>
      <div className="mb-4">
        <Input
          type="email"
          label={LANGUAGES[state.lang].Email}     
          placeholder={LANGUAGES[state.lang].Email}
          value={email}
          handler={setEmail}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          label={LANGUAGES[state.lang].Password}
          placeholder={LANGUAGES[state.lang].Password}
          value={pwd}
          handler={setPwd}
          showTooltip
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          label={LANGUAGES[state.lang].Auth.RepeatPassword}
          placeholder={LANGUAGES[state.lang].Auth.RepeatPassword}
          value={repeat}
          handler={setRepeat}
        />
      </div>
      <Button
        text={LANGUAGES[state.lang].Auth.SignUpButton}
        disabled={disabled()}
        handler={() => signUp(email, pwd, repeat)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text={LANGUAGES[state.lang].Auth.GoToSignIn} to={ROUTES[state.lang].SIGN_IN} size="xl" />
      </div>
    </form>
  );
}