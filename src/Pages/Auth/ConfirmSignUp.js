import { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, Title, Input } from "../../Components";


export default function ConfirmSignUp() {
  const location = useLocation();
  const { setAlert, resendConfirmationCode, confirmSignUp } =
    useOutletContext();
  const [email, setEmail] = useState(location?.state?.email || "");
  const [code, setCode] = useState("");

  useEffect(() => {   
    setAlert(location?.state?.alert);
  }, [location?.state?.alert, setAlert]);

  const disabled = () =>
    email === "" || !isValidEmail(email) || code === "" || code.length < 6;

  return (
    <form>
      <Title text="Confirm Registration" />
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
      <div className="mb-4 flex justify-end text-indigo-500 hover:text-amber-500 duration-200 transition ease-in-out">
        <button
          type="button"
          onClick={() => resendConfirmationCode(email)}
          className="btn btn-light borders-0"
        >
          Resend Confirmation Code
        </button>
      </div>
      <Button
        text="Confim"
        disabled={disabled()}
        handler={() => confirmSignUp(email, code)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}