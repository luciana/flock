import { Auth as AmplifyAuth } from "aws-amplify";

const SignUp = async (email, password, name, gender, zip, birthday, locale) => {
  console.log("Auth Signup - about to call Amplify signup with ", email, locale, name);
  //some users getting an error here-> Client.js:102          POST https://cognito-idp.us-east-1.amazonaws.com/ 400 
  await AmplifyAuth.signUp({
    username: email,
    password,
    attributes: { email, locale, name, gender, zip, birthday},
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
  console.log("Service Auth.js SignIn Auth returned from Amplify", auth);
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
  console.log("Service Auth.js GetUser attributes returned from Amplify", attributes);
  return attributes;
};

const SignOut = async () => {
  await AmplifyAuth.signOut({ global: true });
  // await AmplifyAuth.signOut()
  // .then(data => console.log("signout data", data))
  // .catch(err => console.log("signout error",err));

};

const ChangeEmail = async (email) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { email: email });
};

const ChangeName = async (name) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  return await AmplifyAuth.updateUserAttributes(user, { name: name });
};

const ChangeZip = async (zip) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { zip: zip });
};

const ChangeBirthday = async (birthday) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { birthday: birthday });
};

const ChangeGender = async (gender) => {
  console.log("Auth.ChangeGender started", gender);
  const user = await AmplifyAuth.currentAuthenticatedUser();
  console.log("Auth.ChangeGender started user authed", user);
  await AmplifyAuth.updateUserAttributes(user, { gender: gender });
};

const ConfirmChangeEmail = async (code) => {
  await AmplifyAuth.verifyCurrentUserAttributeSubmit("email", code);
};

const ChangePassword = async (pwd, newPwd) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.changePassword(user, pwd, newPwd);
};

const ChangeLanguage = async (language) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { locale: language });
};

const GetCredentials = async () => {
  const credentials = await AmplifyAuth.currentCredentials();
  return credentials;
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
  ChangeName,
  ConfirmChangeEmail,
  ChangePassword,
  ChangeLanguage,
  GetCredentials,
  ChangeGender,
  ChangeZip,
  ChangeBirthday,
};

export default Auth;