import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES } from "../../Constants";
import { isValidEmail } from "../../Helpers";
import {
    Button,
    AuthLink,
    AuthTitle,
    Input,
    RememberMe,
  } from "../../Components";

export default function SignIn() {
  const location = useLocation();
  const { state } = useContext(AppContext);
    const { setAlert, signIn } = useOutletContext();
    const [email, setEmail] = useState(location?.state?.email || "");
    const [pwd, setPwd] = useState("");
    const [remember, setRemember] = useState(false);
  
    useEffect(() => {
      setAlert(location?.state?.alert);
    }, [location?.state?.alert, setAlert]);
  
    const disabled = () => email === "" || !isValidEmail(email) || pwd === "";
    console.log("Signin.js state context", state);
    return (
      <form className="form-control">
        <AuthTitle text={LANGUAGES[state.lang].Auth.SignInTitle} />
        <div className="mb-4">
          <Input
            type="email"
            placeholder={LANGUAGES[state.lang].Email}
            value={email}
            handler={setEmail}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder={LANGUAGES[state.lang].Password}
            value={pwd}
            handler={setPwd}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <RememberMe remember={remember} setRemember={setRemember} />
          <AuthLink
          to={ROUTES[state.lang].FORGOT_PASSWORD}
          text={LANGUAGES[state.lang].Auth.ForgotPassword}
        />
        </div>
        <Button
        text={LANGUAGES[state.lang].Auth.SignInButton}
        disabled={disabled()}
        handler={() => signIn(email, pwd, remember)}
        full
      />
        <div className="w-full text-center mt-6">
        <AuthLink
          to={ROUTES[state.lang].SIGN_UP}
          text={LANGUAGES[state.lang].Auth.NotRegistered}
          size="xl"
        />
      </div>
      </form>
    );
  }