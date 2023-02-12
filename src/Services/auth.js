import { Auth as AmplifyAuth } from "aws-amplify";

const SignUp = async (email, password, name, gender, address, birthdate, locale) => {
  console.log("Auth Sign up");
  return await AmplifyAuth.signUp({
    username: email,
    password,
    attributes: { email, locale, name, gender, address, birthdate},
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
  try{ 
    const user = await AmplifyAuth.currentAuthenticatedUser();
    return await AmplifyAuth.updateUserAttributes(user, { name: name });
  }catch(error){
    return null;    
  }
};

const ChangeZip = async (address) => {
  try{ 
    const user = await AmplifyAuth.currentAuthenticatedUser();
    await AmplifyAuth.updateUserAttributes(user, { address: address });
  }catch(error){
    return null;    
  }
};

const ChangeBirthdate = async (birthdate) => {

  try{ 
  console.log("Change ChangeBirthdate input", ChangeBirthdate);
  const user = await AmplifyAuth.currentAuthenticatedUser();    
  console.log("Change ChangeBirthdate for user", user);
  return await AmplifyAuth.updateUserAttributes(user, { birthdate: birthdate });
  }catch(error){
    return null;    
  }
};

const ChangeGender = async (gender) => {
  try{   
    console.log("Change Gender input", gender);
    const user = await AmplifyAuth.currentAuthenticatedUser();    
    console.log("Change Gender for user", user);
    //return await AmplifyAuth.updateUserAttributes(user, { 'gender': gender });   
    return await AmplifyAuth.updateUserAttributes(user, {
      'gender': gender
    });
  }catch(error){
    return null;
    //console.error("Auth.ChangeGender gender attribute  update error",error);
  }

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

const DeleteUser =  async () => {
  return await Auth.deleteUser();  
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
  ChangeBirthdate,
  DeleteUser,
};

export default Auth;