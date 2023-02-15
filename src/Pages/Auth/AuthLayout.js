/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES, TYPES } from "../../Constants";
import Auth from "../../Services/auth";
import { Alert, Loading, HomeNav } from "../../Components";
import '../pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function AuthLayout() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  const startLoading = () => {
    setLoading(true);
    setAlert();
  };

  const stopLoading = () => {
    setLoading(false);
    setAlert();
  };

  const signIn = async (email, pwd, remember) => {
    startLoading();
    try {
      const { attributes } = await Auth.SignIn(email, pwd, remember);
      console.log("AuthLayout.js signIn Auth attributes", attributes);     
      dispatch({ type: TYPES.UPDATE_LANG, payload: attributes.locale });
      stopLoading();
      console.log("Navigate to ROUTES[en-US].MAIN", ROUTES[attributes.locale].MAIN);
      navigate(ROUTES[attributes.locale].MAIN);
    } catch (err) {
      stopLoading();
      console.error("AuthLayout.js signIn error calling Auth.Signin", err);
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.Login,
      });
    }
  };

  const sendForgotPasswordCode = async (email) => {
    startLoading();
    try {
      await Auth.ForgotPassword(email);
      stopLoading();
      navigate(ROUTES[state.lang].REDEFINE_PASSWORD, {
        state: {
          email,
          alert: {
            type: "info",
            text: LANGUAGES[state.lang].Auth.ForgotPasswordSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.SendCode,
      });
    }
  };

  const redefinePassword = async (email, code, pwd) => {
    startLoading();
    try {
      await Auth.RedefinePassword(email, code, pwd);
      stopLoading();
      navigate(ROUTES[state.lang].SIGN_IN, {
        state: {
          email,
          alert: {
            type: "success",
            text: LANGUAGES[state.lang].Auth.RedefinePasswordSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.RedefinePassword,
      });
    }
  };

  const signUp = async (email, pwd, name, gender, address, birthdate) => {
    startLoading();
    try {
      console.log("AuthLayout.js signUp", email, name, gender, address, birthdate);
      await Auth.SignUp(email, pwd, name, gender, address, birthdate,state.lang );
      stopLoading();
      navigate(ROUTES[state.lang].CONFIRM_SIGN_UP, {
        state: {
          email,
          alert: {
            type: "info",
            text: LANGUAGES[state.lang].Auth.SignUpSuccess,
          },
        },
     });
    } catch (err) {
      stopLoading();    
      console.log("Auth Layout.js Signup error", err);
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.SignUp,
      });
    }
  };

  const resendConfirmationCode = async (email) => {
    startLoading();
    try {
      await Auth.ResendConfirmationCode(email);
      stopLoading();
      navigate(ROUTES[state.lang].CONFIRM_SIGN_UP, {
        state: {
          email,
          alert: {
            type: "success",
            text: LANGUAGES[state.lang].Auth.ResendConfirmationSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.SendCode,
      });
    }
  };

  const confirmSignUp = async (email, code) => {
    startLoading();
    try {
      await Auth.ConfirmSignUp(email, code);
      stopLoading();
      navigate(ROUTES[state.lang].SIGN_IN, {
        state: {
          email,
          alert: {
            type: "success",
            text: LANGUAGES[state.lang].Auth.ConfirmRegistrationSuccess,
          },
        },
      });
    } catch (err) {
      stopLoading();
      setAlert({
        type: "error",
        text: LANGUAGES[state.lang].CommonError.ConfirmSignUp,
      });
    }
  };

  useEffect(() => {
    console.log("AuthLayout.js state context", state);
    const loadUser = async () => {
      setLoading(true);
      try {
        await Auth.GetUser();
        setLoading(false);
        navigate(ROUTES[state.lang].MAIN);
      } catch (error) {
        // setAlert({
        //   type: "error",
        //   text: LANGUAGES[state.lang].CommonError.SignUpAuthentication,
        // });
        // navigate(ROUTES[state.lang].SIGN_IN);
        setLoading(false);
      }
    };
    
    loadUser();
  }, [navigate, state.lang]);

 

  return (
    <div className="App">      
      <HomeNav />
     
      {loading && <Loading />}
      <div className="container my-4">
      
        <div className="h-full flex flex-col-reverse md:flex-row items-center justify-evenly">         
          <div className="w-10/12 md:w-5/12 lg:w-4/12"></div>
              <Alert type={alert?.type} text={alert?.text} />           
              <Outlet
                  context={{            
                    setAlert,
                    signIn,
                    sendForgotPasswordCode,
                    redefinePassword,
                    signUp,
                    resendConfirmationCode,
                    confirmSignUp,
                  }}
                  />
          </div>
          </div></div>
       
  );
}