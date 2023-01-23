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

  const loadUser = useCallback(async ({force, email, locale}) => {
    if (!state.user || force === true) {
      let user = await Queries.GetUserByEmail(email);
      if (!user) user = await Mutations.CreateUser(email, locale);
      dispatch({ type: TYPES.UPDATE_LANG, payload: locale || user.locale });
      dispatch({ type: TYPES.UPDATE_USER, payload: user });
    }
  }, []);

  const handleSignOut = async () => {
    await Auth.SignOut();
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    navigate(ROUTES[state.lang].SIGN_IN);
  }

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const attributes = await Auth.GetUser();
        console.log("sucessful  useEffect isUserLoggedIn in Layout ", attributes);
        await loadUser({
          email: attributes.email,
          locale: attributes.locale,
        });
      } catch (error) {
        console.log("error useEffect isUserLoggedIn in Layout", error);
        navigate(ROUTES[state.lang].SIGN_IN);
      }
    };

    isUserLoggedIn();
  }, []);

  if (!state.user) return <Loading />;

  return (
    <main className="mx-auto h-screen">
      {loading && <Loading />}
      <SideNav handleSignOut={handleSignOut} />      
      <div className="mx-auto max-w-screen-lg p-4">
         <Outlet context={{ loadUser , setLoading}} />
      </div>
    </main>
  );
}