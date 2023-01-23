
import './../pages.css';
import './../profile-nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Auth from "../../Services/auth";
import { Alert, Input} from "../../Components";
import { isValidEmail } from "../../Helpers";

export default function Profile() {
  const { user, loadUser, setLoading } = useOutletContext();
  const [alert, setAlert] = useState();
  const [showCode, setShowCode] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const disabled = () => email === "" || !isValidEmail(email);

  useEffect(() => {
    user && setEmail(user?.email);
  }, [user]);

  const loading = () => {
    setAlert()
    setLoading(true);
  }

  const handleChangeEmail = async () => {
    loading();
    try {
      await Auth.ChangeEmail(email);
      setShowCode(true);
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    loading();
    try {
      await Auth.ConfirmChangeEmail(code);
      loadUser(true);
      setShowCode(false);
      setAlert({ type: "success", text: 'Email changed successfully!' });
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    }
    setLoading(false);
  };

  const handlePassword = async () => {
    loading();
    try {
      await Auth.ChangePassword(currentPassword, newPassword);
      setAlert({ type: "success", text: 'Password changed successfully!' });
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    }
    setLoading(false);
  };

  const disabledEmail = () =>
    !email || email === user.email || !isValidEmail(email);

  const disabledCode = () => !code || code.length > 6;

  const disabledPassword = () =>
    !currentPassword ||
    newPassword !== repeatPassword ||
    newPassword.length < 8;

  const renderEmail = () => (
    <>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        handler={setEmail}
      />    
       <button
          type="button"
          onClick={() => handleChangeEmail()}
          disabled={disabledEmail()}
          className={`${
            disabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-500 cursor-pointer hover:bg-amber-500 hover:shadow-md focus:bg-amber-500 focus:shadow-md focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-md"
          } inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
        >
          Change Email
        </button>
    </>
  );

  const renderCode = () => (
    <>
     <h1 className="text-xl text-center mb-4 uppercase">Title</h1>
     
      <Input type="text" placeholder="Code" value={code} handler={setCode} />  
      <button
          type="button"
          onClick={() => handleVerifyCode()}
          disabled={disabledCode()}
          className={`${
            disabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-500 cursor-pointer hover:bg-amber-500 hover:shadow-md focus:bg-amber-500 focus:shadow-md focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-md"
          } inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
        >
        Send Code
        </button>

    </>
  );

  const renderChangeEmail = () => (
    <form className="w-full flex flex-wrap bg-white p-4 mb-4 mt-4 rounded-md shadow-md">
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        {!showCode ? renderEmail() : renderCode()}
      </div>
    </form>
  );

  const renderChangePassword = () => (   
      <form className="w-full flex flex-wrap bg-white p-4 mb-4 mt-4 rounded-md shadow-md">
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        <Input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          handler={setCurrentPassword}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          handler={setNewPassword}
          showTooltip
        />
        <Input
          type="password"
          placeholder="Repeat New Password"
          value={repeatPassword}
          handler={setRepeatPassword}
        />       
        <button
            type="button"
            onClick={() => handlePassword()}
            disabled={disabledPassword()}
            className={`${
              disabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-500 cursor-pointer hover:bg-amber-500 hover:shadow-md focus:bg-amber-500 focus:shadow-md focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-md"
            } inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full`}
          >
          Change Password
          </button>
      </div>
    </form>
  );

  return (
    <section>
       <div className="App profile">
          <h4> Profile </h4>
          <Alert type={alert?.type} text={alert?.text} />
          {renderChangeEmail()}
          {renderChangePassword()}
          
          <hr className="m-0"></hr>                   
        </div>
    
    </section>
  );
}