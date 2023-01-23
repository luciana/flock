import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, Title, Input } from "../../Components";

export default function RedefinePassword() {
  
    const location = useLocation();
    const { setAlert, redefinePassword } = useOutletContext();
    const [email, setEmail] = useState(location?.state?.email || "");
    const [code, setCode] = useState("");
    const [pwd, setPwd] = useState("");
    const [repeat, setRepeat] = useState("");
  
    useEffect(() => {      
      setAlert(location?.state?.alert);
    }, [location?.state?.alert, setAlert]);
  
    const disabled = () =>
      email === "" ||
      !isValidEmail(email) ||
      code === "" ||
      code.length < 4 ||
      pwd === "" ||
      repeat === "" ||
      pwd !== repeat;
  
    return (
      <form>
        <Title text="redefine password" />
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            handler={setEmail}
          />
        </div>
        <div className="mb-4">
          <Input type="text" placeholder="Code" value={code} handler={setCode} />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={pwd}
            handler={setPwd}
            showTooltip
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Repeat Password"
            value={repeat}
            handler={setRepeat}
          />
        </div>
        <Button
          text="Redefine Password"
          disabled={disabled()}
          handler={() => redefinePassword(email, code, pwd, repeat)}
        />
        <div className="w-full text-center mt-6">
          <AuthLink text="Back to Sign In" to="/" size="xl" />
        </div>
      </form>
    );
  }