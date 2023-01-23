import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import {
    Button,
    AuthLink,
    Title,
    Input,
    RememberMe,
  } from "../../Components";

export default function SignIn() {
    const location = useLocation();
    const {setAlert, signIn } = useOutletContext();
    const [email, setEmail] = useState(location?.state?.email || "");
    const [pwd, setPwd] = useState("");
    const [remember, setRemember] = useState(false);
  
    useEffect(() => {      
      setAlert(location?.state?.alert);
    }, [location?.state?.alert, setAlert]);
  
    const disabled = () => email === "" || !isValidEmail(email) || pwd === "";
  
    return (
      <form>
        <Title text="Sign In" />
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            handler={setEmail}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={pwd}
            handler={setPwd}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <RememberMe remember={remember} setRemember={setRemember} />
          <AuthLink to="/forgotpassword" text="Forgot Password?" />
        </div>
        <Button
          text="Sign In"
          disabled={disabled()}
          handler={() => signIn(email, pwd, remember)}
        />
        <div className="w-full text-center mt-6">
          <AuthLink to="/signup" text="Not registered?" size="xl" />
        </div>
      </form>
    );
  }