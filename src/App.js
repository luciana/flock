import {
    BrowserRouter as Router,
    Routes,
    Route,   
  } from "react-router-dom";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './Pages/pages.css'
  import { lazy, Suspense } from "react";
  import Navigation from './Components/Shared/Navigation';
  import {Loading} from "./Components";
  //https://www.linkedin.com/pulse/complete-login-flow-using-react-aws-amplify-auth-s3-jos%C3%A9-augusto/
 
  import MainPage from './Pages/Main';
  const AuthLayout = lazy(() => import("./Pages/Auth/AuthLayout"));
  const SignIn = lazy(() => import("./Pages/Auth/SignIn"));
  const ForgotPassword = lazy(() => import("./Pages/Auth/ForgotPassword"));
  const RedefinePassword = lazy(() => import("./Pages/Auth/RedefinePassword"));
  const SignUp = lazy(() => import("./Pages/Auth/SignUp"));
  const ConfirmSignUp = lazy(() => import("./Pages/Auth/ConfirmSignUp"));


  const HomePage = lazy(() => import('./Pages/Home'));
  const NotFoundPage = lazy(() => import("./Pages/NotFound"));
  const ProfilePage = lazy(() => import("./Pages/Profile"));  
  const NewQuestionPage= lazy(() => ('./Pages/NewQuestion'));


  function App() {
    return (      
      <Router>
        <Navigation/>
        <div>
        <Suspense fallback={<Loading />}>
          <Routes>           
            <Route path="/" exact element={<HomePage />} />
            <Route path="/Profile" exact element={<ProfilePage />} />
            <Route path="/Main" exact element={<MainPage />} />   
            <Route path="/New" exact element={<NewQuestionPage />} /> 
            <Route element={<AuthLayout />}>
              <Route path="/" element={<SignIn />} />
              <Route path="/forgorpassword" element={<ForgotPassword />} />
              <Route path="/redefinepassword" element={<RedefinePassword />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/confirmsignup" element={<ConfirmSignUp />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />                   
          </Routes>
          </Suspense>
        </div>
      </Router>
 
    );
  }
  
  export default App;
  