import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, AuthTitle, Input } from "../../Components";

export default function SignUp() {
  const { setImg, setAlert, signUp } = useOutletContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");

  useEffect(() => {
    setImg();
    setAlert();
  }, [setAlert, setImg]);

  const disabled = () =>
    email === "" ||
    !isValidEmail(email) ||
    pwd === "" ||
    repeat === "" ||
    pwd !== repeat;

  const appname = process.env.REACT_APP_TITLE;
  console.log('app name', appname);

  return (
    <form>
      <AuthTitle text="Welcome " />
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
          label="Email"     
          placeholder="Email"
          value={email}
          handler={setEmail}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          value={pwd}
          handler={setPwd}
          showTooltip
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          label="Password again"
          placeholder="Repeat the Password"
          value={repeat}
          handler={setRepeat}
        />
      </div>
      <Button
        text="Sign Up"
        disabled={disabled()}
        handler={() => signUp(email, pwd, repeat)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text="Back to Sign In" to="/" size="xl" />
      </div>
    </form>
  );
}