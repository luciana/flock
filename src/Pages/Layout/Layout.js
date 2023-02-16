import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { ROUTES, TYPES } from "../../Constants";
import Auth from "../../Services/auth";
import '../pages.css';
import './../profile-nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import { SideNav, Loading} from "../../Components";

export default function Layout() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(async ({force, email, locale, name, address, birthdate, gender, userTag}) => {      
     // console.log("Layout.js loadUser input", email, locale, name, address, birthdate, gender);
     console.log("Layhout.js is user in state?", state);  
    if (!state.user || force === true) { 
      let user = await Queries.GetUserByEmail(email);
      console.log("Layout.js queries.GetUserByEmail result", user);   
     
      if (!user) {
        //The user is created in cognito but not in GraphQL. 
        //Create user in GraphQL with the attributes from Cognito
        user = await Mutations.CreateUser(email, locale, name, address, birthdate, gender, userTag);    
        console.log("Layout.js create user in mutation", user);
      }else{
        //The user is created in Cognito and in GraphQL
        //Check if the attribute fields are different btw Cognito and GraphQL
        //If so, update GraphQL data with Cognito data
        console.log(" user is created in Cognito and in GraphQL");
        const needsUpdate  =
          user.gender === gender ||
          user.birthdate === birthdate ||
          user.address === address ||
          user.locale === locale ||
          user.userTag === userTag ||
          user.name === name;
        
         console.log("there is data discrepancy in Cognito and in GraphQL", needsUpdate);

        //If any of the fields above are different, then update GraphQL
        // if(needsUpdate){
        //   console.log(" user data is different btw Cognito and in GraphQL. Call Update user next");
        //   user = await Mutations.UpdateUser(email, locale, name, address, birthdate, gender);    
        //   console.log("Called update use because data was different btw cognito and graphql, update user was done. user data is now:", user);
        // }
      }
     //Update language and user in the cookie
      dispatch({ type: TYPES.UPDATE_LANG, payload: locale || user.locale });
      dispatch({ type: TYPES.UPDATE_USER, payload: user });
    } 
     console.log("User exist in the state" , state.user);
  }, [dispatch, state.user]);

  const handleSignOut = async () => {
    
    await Auth.SignOut();
    console.log("Cleared cognito data in handlesignout");
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    console.log("Cleared user data in state");
    navigate(ROUTES[state.lang].HOME);
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const attributes = await Auth.GetUser();
        console.log("Layout.js isUserLoggedIn Auth GetUser attributes", attributes);
        await loadUser({
          email: attributes.email,
          locale: attributes.locale,
          name: attributes.name,  
          gender: attributes.gender,
          address: attributes.address,
          birthdate: attributes.birthdate,
          userTag: "",
        });
      } catch (error) {
        console.error("Layout.js Main error in isUserLoggedIn", error);

        navigate(ROUTES[state.lang].SIGN_IN);
      }
    };

    isUserLoggedIn();
  }, [loadUser, navigate, state.lang]);

  if (!state.user) return <Loading />;

  return (
    <section className="App profile mx-auto max-w-screen-lg h-screen">
      {loading && <Loading />}
     
      <SideNav handleSignOut={handleSignOut} />
      <div className="">
        <Outlet context={{ loadUser, setLoading }} />
      </div>     
     
    </section>
  );
}