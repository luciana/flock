import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "../../Services/auth";
import '../pages.css';
import './../profile-nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav from '../../Components/Shared/SideNav';
import { Alert, Loading } from "../../Components";

export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState();


  const loadUser = async (force) => {
    if (!user || force === true) {
        try {
            const attributes = await Auth.GetUser();
            setUser(attributes)
            setLoading(false);
          } catch (error) {
            navigate('/')
          }
    }
  };

  const handleSignOut = async () => {
    await Auth.SignOut();
    navigate('/');
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <main className="mx-auto h-screen">
      {loading && <Loading />}
      <SideNav user={user} handleSignOut={handleSignOut} />
      <div className="mx-auto max-w-screen-lg p-4">
         <Outlet context={{ user, loadUser , setLoading}} />
      </div>
    </main>
  );
}