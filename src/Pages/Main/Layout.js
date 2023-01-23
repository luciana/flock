import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Auth from "../../Services/auth";
import { Loading } from "../../Components";
import '../pages.css';
import './../profile-nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav from '../../Components/Shared/SideNav';

export default function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    setLoading(true);
    setUser(await Auth.GetUser());
    setLoading(false);
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
        <Outlet context={{ user }} />
      </div>
    </main>
  );
}