import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  const handleMeetClick = (e) => {
    const albumNav = document.querySelector("#meetDeveloper");
    albumNav.scrollIntoView({behavior: "smooth"});
  }

  return (
    <>
      {sessionUser ? (
        <nav className='test'>
          <div className='navContainer'>
            <div className='navLeft'>
              <NavLink to='/' exact={true} activeClassName='active'>Green Arrow</NavLink>
              <div>
                <input placeholder='Search' type='text'></input>
              </div>
            </div>
            <div className='navRight'>
              <div>LinkedIn</div>
              <div>Github</div>
              <NavLink to='/' exact={true} activeClassName='active'>Portfolio</NavLink>
              <div>Account</div>
              <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink>
              <LogoutButton />
            </div>
          </div>
        </nav>
      ) : (
        <nav className='splashNavWrapper'>
          <div className='splashNavContainer'>
            <div className='splashNavLeft'>
              <NavLink className='splashNavLogoContainer' to='/' exact={true} activeClassName='active'>
                <img className='splashNavLogoImage' src='/images/logo.png' alt='GreenArrow Logo'></img>
                <div className='splashNavLogoText'>GreenArrow</div>
              </NavLink>
              <a className='splashNavGitHub' href='https://github.com/wylin94'>GitHub</a>
              <a className='splashNavLinkedIn' href='https://www.linkedin.com/in/wylin94/'>LinkedIn</a>
              <button className='splashNavMeet' onClick={handleMeetClick}>Meet the developer</button>
            </div>
            <div className='splashNavRight'>
              <NavLink className='splashNavLogIn' to='/login' exact={true} activeClassName='active'>Log In</NavLink>
              <NavLink className='splashNavSignUp' to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
