import { Auth as AmplifyAuth } from "aws-amplify";

const SignUp = async (email, password, name, locale) => {
  console.log('trigger sign up');
  await AmplifyAuth.signUp({
    username: email,
    password,  
    attributes: {email,locale},
  });
 
};

const ResendConfirmationCode = async (email) => {
  await AmplifyAuth.resendSignUp(email);
};

const ConfirmSignUp = async (email, code) => {
  await AmplifyAuth.confirmSignUp(email, code);
};

const SignIn = async (email, pwd, remember) => {
  const auth = await AmplifyAuth.signIn(email, pwd);

  console.log("successful AmplifyAuth.signIn call in Auth.js", auth);

  if (auth.challengeName === "NEW_PASSWORD_REQUIRED")
    await AmplifyAuth.completeNewPassword(auth, pwd);
  if (remember) await AmplifyAuth.rememberDevice();
  else await AmplifyAuth.forgetDevice();

  return auth;
};

const ForgotPassword = async (email) => {
  await AmplifyAuth.forgotPassword(email);
};

const RedefinePassword = async (email, code, pwd) => {
  await AmplifyAuth.forgotPasswordSubmit(email, code, pwd);
};

const GetUser = async () => {
  const { attributes } = await AmplifyAuth.currentAuthenticatedUser();
  console.log("user attributes", attributes);
  return attributes;
};

const SignOut = async () => {
  await AmplifyAuth.signOut({ global: true });
};

const ChangeEmail = async (email) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { 'email': email });
}

const ConfirmChangeEmail = async (code) => {
  await AmplifyAuth.verifyCurrentUserAttributeSubmit('email', code);
}

const ChangePassword = async (pwd, newPwd) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.changePassword(user, pwd, newPwd);
}

const Auth = {
  SignUp,
  ResendConfirmationCode,
  ConfirmSignUp,
  SignIn,
  ForgotPassword,
  RedefinePassword,
  GetUser,
  SignOut,
  ChangeEmail,
  ConfirmChangeEmail,
  ChangePassword
};


export default Auth;