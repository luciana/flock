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
  }, [dispatch, state.user]);

  const handleSignOut = async () => {
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
          locale: "en-US", //this should be attributes.locale
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
    <main className="mx-auto max-w-screen-lg h-screen">
      {loading && <Loading />}
      <SideNav handleSignOut={handleSignOut} />
      <div className="h-full -mt-12 pt-12">
        <Outlet context={{ loadUser, setLoading }} />
      </div>
    </main>
  );
}