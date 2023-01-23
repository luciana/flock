import React from 'react';
import Avatar from 'react-avatar';
import logo from'../../Assets/Images/logos/Flock-App-logos_white-small.png';
import { LANGUAGES, ROUTES } from "../../Constants";
import { AppContext } from "../../Contexts";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav, NavItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';


function SideNav({ handleSignOut }) {
    const { state } = useContext(AppContext);
    const { user } = state;
    const location = useLocation();

    const tabs = [{
        route: ROUTES[user.locale].MAIN,
        icon: faHome,
        label: LANGUAGES[user.locale].Home
      },{
        route: "/New",
        icon: faPlus,
        label: LANGUAGES[user.locale].Questions.New
      },{
        route: "/Profile",
        icon: faUserCircle,
        label: LANGUAGES[user.locale].Profile.Account
      }]

  return(
      <>       
     {/* Top Bar Filtering*/}
    <div className={true ? 'd-none' : 'd-block'}>
      <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top top-tab-nav" 	role="link">
        <div className="container-fluid">
            <a className="navbar-brand" href={ROUTES[user.locale].MAIN}>Flock App</a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to={ROUTES[user.locale].MAIN} className="nav-link">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/stats" className="nav-link">
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/#" className="nav-link">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
      </div>
       {/* Bottom Tab Navigator*/}
       <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {
              tabs.map((tab, index) =>(
                <NavItem key={`tab-${index}`}>
               
                  <NavLink to={tab.route} className={(navData) => (navData.isActive ? "nav-link bottom-nav-link active-style" : 'nav-link bottom-nav-link none')}>
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      <FontAwesomeIcon size="lg" icon={tab.icon}/>
                      <div className="bottom-tab-label">{tab.label}</div>
                    </div>
                  </NavLink>
                </NavItem>
              ))
            }
          </div>
        </Nav>
      </nav>
        {/* Side Tab Navigator*/}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="sideNav">       
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
                <span className="d-block d-lg-none">{process.env.REACT_APP_TITLE}</span>
                <span className="d-none d-lg-block">    
                    <p><img src={logo} className="img-fluid" alt={process.env.REACT_APP_TITLE} /> </p>
                    <Avatar name={user} className=" img-profile rounded-circle mx-auto mb-2" alt={user} />
                    <div className="text-white my-3 profile-name">{user}</div>   
                </span>          
            </a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">                                                                     
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href={ROUTES[user.locale].MAIN}>Questions</a></li>     
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="/New">New Question</a></li>  
                    <hr />
                    <li className="nav-item">                     
                      <button type="button" onClick={() => handleSignOut()} className="nav-link js-scroll-trigger">
                        {LANGUAGES[user.locale].Profile.SignOut}
                      </button>
                      </li>                
                </ul>
            </div>
        </nav>
      </>
  );
}

export default SideNav;