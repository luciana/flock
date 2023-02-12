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
import { SideNav, Loading } from "../../Components";

export default function Layout() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log("Layhout.js state", state);  

  const loadUser = useCallback(async ({force, email, locale, name, address, birthdate, gender}) => {      
      console.log("Layout.js loadUser input", email, locale, name, address, birthdate, gender);
    if (!state.user || force === true) {     
      let user = await Queries.GetUserByEmail(email);
      console.log("Layout.js queries.GetUserByEmail result", user);   
      if (!user) user = await Mutations.CreateUser(email, locale, name, address, birthdate, gender);    
      console.log("Layout.js create user in mutation", user);
      dispatch({ type: TYPES.UPDATE_LANG, payload: locale || user.locale });
      dispatch({ type: TYPES.UPDATE_USER, payload: user });
    } 
  }, [dispatch, state.user]);

  const handleSignOut = async () => {
    console.log("Layout.js handleSignOut");
    await Auth.SignOut();
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    navigate(ROUTES[state.lang].SIGN_IN);
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