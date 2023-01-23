import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, Title, Input } from "../../Components";


export default function ForgorPassword() {
  const { setImg, setAlert, sendForgotPasswordCode } = useOutletContext();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setImg();
    setAlert();
  }, [setAlert, setImg]);

  const disabled = () => email === "" || !isValidEmail(email);

  return (
    <form>
      <Title text="forgot password" />
      <div className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          handler={setEmail}
        />
      </div>
      <Button
        text="Send Code"
        disabled={disabled()}
        handler={() => sendForgotPasswordCode(email)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}